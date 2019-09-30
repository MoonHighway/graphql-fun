import { getTeamByPlayer } from "../db";

export const Player = {
  team: player => getTeamByPlayer(player.login),
  instructions() {}
};
