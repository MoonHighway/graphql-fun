import { getTeamByPlayer, getCurrentCallout, getCurrentGame } from "../db";

export const Player = {
  team: player => getTeamByPlayer(player.login),
  instructions: async () => ({
    callout: await getCurrentCallout(),
    game: await getCurrentGame()
  })
};
