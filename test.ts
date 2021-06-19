import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { fetchAllTeamData, fetchFixtureData } from "./fetch.ts";

Deno.test("Fetch All FPL Teams", async () => {
  const teams = await fetchAllTeamData();
  assertNotEquals(teams, undefined);
  assertEquals(teams.length, 20);
});

Deno.test("Fetch All Fixture Data", async () => {
  const fixtures = await fetchFixtureData();
  assertNotEquals(fixtures, undefined);
});
