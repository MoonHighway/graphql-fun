import {
  getTeamByPlayer,
  getCurrentCallout,
  getCurrentGame,
  isOver
} from "../db";

export const Player = {
  team: player => getTeamByPlayer(player.login),
  instructions: async () => ({
    callout: await getCurrentCallout(),
    game: await getCurrentGame(),
    end: await isOver()
  })
};
