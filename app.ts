import { fetchAllTeamData, fetchFixtureDataForTeam } from "./fetch.ts";
import { getAwayResultsForTeam, getHomeResultsForTeam, getTeamId } from "./helpers.ts";
import { Team } from "./interfaces.ts";

const run = async () => {
  const name = "Man Utd";

  const teams: Team[] = await fetchAllTeamData();
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
        points: homePoints 
      }
    ],
    Away: [
      { 
        win: awayWin, 
        draw: awayDraw, 
        loss: awayLoss, 
        points: awayPoints 
      }
    ],
    Total: [
      { 
        win: homeWin + awayWin, 
        draw: homeDraw + awayDraw, 
        loss: homeLoss + awayLoss, 
        points: homePoints + awayPoints
      }
    ],
  });
};

run();
