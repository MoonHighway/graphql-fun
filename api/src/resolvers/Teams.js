import { random } from "html-colors";
import { breakIntoGroups } from "../lib";
import ColorManager from "color";
import {
  getAllTeams,
  getTeam,
  getAllPlayers,
  createTeam,
  clearAllTeams
} from "../db";

export const Query = {
  allTeams: () => getAllTeams(),
  Team: (root, { color }) => getTeam(color)
};

export const Mutation = {
  createTeams: async (root, { count = 2 }, { pubsub }) => {
    const players = await getAllPlayers();
    const groups = breakIntoGroups(count, players);
    const teams = [...Array(count)].map((_, i) =>
      createTeam(random(), groups[i])
    );
    pubsub.publish("new-instructions");
    return teams;
  },
  destroyTeams: (_, args, { pubsub, isAdmin }) => {
    if (!isAdmin) {
      throw new Error("Only Eve can destroy the teams");
    }
    clearAllTeams();
    pubsub.publish("new-instructions");
    return true;
  }
};

export const Color = {
  name: ({ name }) => name,
  hex: ({ name }) => ColorManager(name).hex(),
  rgb: ({ name }) =>
    ColorManager(name)
      .rgb()
      .negate()
      .string(),
  negate: ({ name }) =>
    ColorManager(name)
      .rgb()
      .negate()
      .string(),
  text: ({ name }) =>
    ColorManager(name).luminosity() > 0.7
      ? ColorManager(name)
          .darken(0.8)
          .string()
      : ColorManager(name)
          .lighten(0.8)
          .string()
};
