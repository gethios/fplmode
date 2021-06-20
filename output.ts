import { MIN_PLAYED_MINIMUM } from "./constants.ts";
import { FixtureResult } from "./interfaces.ts";
import { TopPerfomers } from "./types.ts";

export function printSeasonResults(name: string, home: FixtureResult, away: FixtureResult, homePoints: number, awayPoints: number): void {
    console.log(`
  ${name}`);

  console.table({
    Home: [
      {
        win: home.win,
        draw: home.draw,
        loss: home.loss,
        points: homePoints,
      },
    ],
    Away: [
      {
        win: away.win,
        draw: away.draw,
        loss: away.loss,
        points: awayPoints,
      },
    ],
    Total: [
      {
        win: home.win + away.win,
        draw: home.draw + away.draw,
        loss: home.loss + away.loss,
        points: homePoints + awayPoints,
      },
    ],
  });
}

export function printTopPerformers(topPerformers: TopPerfomers[]): void {
    console.log(`
  Top performers (>= ${MIN_PLAYED_MINIMUM} minutes played)`);
  console.table(topPerformers);
}