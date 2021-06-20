import { parse } from "https://deno.land/std@0.99.0/flags/mod.ts";
import { MIN_PLAYED_MINIMUM } from "./constants.ts";

import {
  fetchAllTeamData,
  fetchFixtureDataForTeam,
  fetchPlayerDataForTeam,
} from "./fetch.ts";
import {
  getAwayResultsForTeam,
  getHomeResultsForTeam,
  getTeamId,
} from "./helpers.ts";
import { Team } from "./interfaces.ts";
import { printSeasonResults, printTopPerformers } from "./output.ts";
import { TeamListItem, TopPerfomers } from "./types.ts";

const run = async () => {
  const parseArgs = parse(Deno.args);

  const teams: Team[] = await fetchAllTeamData();

  if (parseArgs.list) {
    const teamNames: TeamListItem[] = teams.map((team) => {
      return { name: team.name, shorthand: team.short_name };
    });
    console.table(teamNames);

    return;
  }

  const name = parseArgs.team;
  if (name === undefined) {
    console.log(
      'Please provide a team by using "--team <team name> | <short hand> (ex. --team "West Ham" | --team WHU)',
    );
    return;
  }

  const teamId = getTeamId(name, teams);

  await showSeasonResult(teamId, name);
  await showTopPerformers(teamId);
};

async function showSeasonResult(teamId: number, name: string): Promise<void> {
  const fixtures = await fetchFixtureDataForTeam(teamId);

  const home = getHomeResultsForTeam(teamId, fixtures);
  const away = getAwayResultsForTeam(teamId, fixtures);

  const homePoints = (3 * home.win) + home.draw;
  const awayPoints = (3 * away.win) + away.draw;

  printSeasonResults(name, home, away, homePoints, awayPoints);
}

async function showTopPerformers(teamId: number): Promise<void> {
  let players = await fetchPlayerDataForTeam(teamId);
  players = players.sort((a, b) =>
    (a.points_per_game > b.points_per_game)
      ? -1
      : ((a.points_per_game < b.points_per_game) ? 1 : 0)
  );
  players = players.filter((player) => player.minutes > MIN_PLAYED_MINIMUM);

  const topPerformers: TopPerfomers[] = players.slice(0, 5).map((player) => {
    return {
      name: player.web_name,
      value: player.value_season,
      points_per_game: player.points_per_game,
    };
  });

  printTopPerformers(topPerformers);
}

run();
