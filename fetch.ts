import { FIXTURE_URL, FPL_DATA_URL } from "./constants.ts";
import { getPlayersFromTeam, getTeamFixtures } from "./helpers.ts";
import { Element, Fixture, FPLData, Team } from "./interfaces.ts";

async function fetchData<Type>(url: string): Promise<Type> {
  const data: Response = await fetch(url);
  const T: Type = await data.json();
  return T;
}

export async function fetchAllTeamData(): Promise<Team[]> {
  const data = await fetchData<FPLData>(FPL_DATA_URL);
  return data.teams;
}

export async function fetchFixtureData(): Promise<Fixture[]> {
  const fixtures = await fetchData<Fixture[]>(FIXTURE_URL);
  return fixtures;
}

export async function fetchFixtureDataForTeam(
  teamId: number,
): Promise<Fixture[]> {
  const data: Fixture[] = await fetchFixtureData();
  const fixtures = getTeamFixtures(teamId, data);

  return fixtures;
}

export async function fetchAllPlayerData(): Promise<Element[]> {
  const data = await fetchData<FPLData>(FPL_DATA_URL);
  return data.elements;
}

export async function fetchPlayerDataForTeam(
  teamId: number,
): Promise<Element[]> {
  const data: Element[] = await fetchAllPlayerData();
  const players = getPlayersFromTeam(teamId, data);

  return players;
}
