import { Fixture, Team } from "./interfaces.ts";
import { FixtureResult } from "./types.ts";

export function getTeamId(name: string, teams: Team[]): number {
  const team = teams.find((
    team: Team,
  ) => (team.name?.toLowerCase() === name.toLowerCase() ||
    team.short_name?.toLowerCase() === name.toLowerCase())
  );

  return team?.id ?? -1;
}

export function getTeamFixtures(teamId: number, fixtures: Fixture[]): Fixture[] {
  return fixtures.filter((fix,) => (fix.team_h === teamId || fix.team_a === teamId));
}

export function getHomeGamesForTeam(teamId: number, fixtures: Fixture[]): Fixture[] {
  return fixtures.filter((fix) => fix.team_h === teamId);
}

export function getAwayGamesForTeam(teamId: number, fixtures: Fixture[]): Fixture[] {
  return fixtures.filter((fix) => fix.team_a === teamId);
}

export function getHomeResultsForTeam(teamId: number, fixtures: Fixture[]): FixtureResult {
  const homeGames = getHomeGamesForTeam(teamId, fixtures);

  let win = 0;
  let draw = 0;
  let loss = 0;

  homeGames.forEach((game) => {
    if (game.team_h_score > game.team_a_score) {
      win += 1;
    } else if (game.team_h_score < game.team_a_score) {
      loss += 1;
    } else {
      draw += 1;
    }
  });

  return [win, draw, loss];
}

export function getAwayResultsForTeam(teamId: number, fixtures: Fixture[]): FixtureResult {
  const homeGames = getAwayGamesForTeam(teamId, fixtures);

  let win = 0;
  let draw = 0;
  let loss = 0;

  homeGames.forEach((game) => {
    if (game.team_a_score > game.team_h_score) {
      win += 1;
    } else if (game.team_a_score < game.team_h_score) {
      loss += 1;
    } else {
      draw += 1;
    }
  });

  return [win, draw, loss];
}
