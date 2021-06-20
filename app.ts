import { parse } from "https://deno.land/std@0.99.0/flags/mod.ts";

import { fetchAllTeamData, fetchFixtureDataForTeam } from "./fetch.ts";
import {
  getAwayResultsForTeam,
  getHomeResultsForTeam,
  getTeamId,
} from "./helpers.ts";
import { Team } from "./interfaces.ts";
import { TeamListItem } from "./types.ts";

const run = async () => {
  const parseArgs = parse(Deno.args);
  
  const teams: Team[] = await fetchAllTeamData();
  
  if (parseArgs.list) {
    const teamNames: TeamListItem[] = teams.map((team) => { 
      return {name: team.name, shorthand: team.short_name}
    });
    console.table(teamNames);

    return;
  }
  
  const name = parseArgs.team;
  if(name === undefined) {
    console.log('Please provide a team by using "--team <team name> | <short hand> (ex. --team "West Ham" | --team WHU)');
    return;
  }

  const teamId = getTeamId(name, teams);

  const fixtures = await fetchFixtureDataForTeam(teamId);

  const [homeWin, homeDraw, homeLoss] = getHomeResultsForTeam(teamId, fixtures);
  const [awayWin, awayDraw, awayLoss] = getAwayResultsForTeam(teamId, fixtures);

  const homePoints = (3 * homeWin) + homeDraw;
  const awayPoints = (3 * awayWin) + awayDraw;

  console.log(`
                          ${name}`);
  console.table({
    Home: [
      {
        win: homeWin,
        draw: homeDraw,
        loss: homeLoss,
        points: homePoints,
      },
    ],
    Away: [
      {
        win: awayWin,
        draw: awayDraw,
        loss: awayLoss,
        points: awayPoints,
      },
    ],
    Total: [
      {
        win: homeWin + awayWin,
        draw: homeDraw + awayDraw,
        loss: homeLoss + awayLoss,
        points: homePoints + awayPoints,
      },
    ],
  });
};

run();
