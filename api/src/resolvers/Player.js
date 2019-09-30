import { getTeamByPlayer, getCurrentCallout } from "../db";

export const Player = {
  team: player => getTeamByPlayer(player.login),
  instructions: async () => ({
    callout: await getCurrentCallout()
  })
};
