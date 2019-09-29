import * as connections from "./Connections";
import * as authorization from "./Authorization";
import * as teams from "./Teams";
import * as selectPlayer from "./SelectPlayer";
import { Instructions } from "./Instructions";
import { Callout } from "./Callout";
import { Game } from "./Game";
import { Player } from "./Player";

export default {
  Query: {
    ...connections.Query,
    ...authorization.Query,
    ...teams.Query
  },
  Mutation: {
    ...teams.Mutation,
    ...authorization.Mutation,
    ...selectPlayer.Mutation
  },
  Subscription: {
    ...connections.Subscription
  },
  Color: teams.Color,
  Instructions,
  Callout,
  Game,
  Player
};
