import * as connections from "./Connections";
import * as authorization from "./Authorization";
import * as teams from "./Teams";
import * as selectPlayer from "./SelectPlayer";
import * as audiencePoll from "./AudiencePoll";
import { Instructions } from "./Instructions";
import {
  Callout,
  Mutation as calloutMutation,
  Query as calloutQuery
} from "./Callout";
import { Game } from "./Game";
import { Player } from "./Player";

export default {
  Query: {
    ...connections.Query,
    ...authorization.Query,
    ...teams.Query,
    ...calloutQuery
  },
  Mutation: {
    ...teams.Mutation,
    ...authorization.Mutation,
    ...selectPlayer.Mutation,
    ...audiencePoll.Mutation,
    ...calloutMutation
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
