import * as connections from "./Connections";
import * as authorization from "./Authorization";
import * as teams from "./Teams";
import * as selectPlayer from "./SelectPlayer";
import * as audiencePoll from "./AudiencePoll";
import {
  Callout,
  Mutation as calloutMutation,
  Query as calloutQuery,
  Subscription as calloutSubscription
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
    ...authorization.Subscription,
    ...calloutSubscription
  },
  Color: teams.Color,
  Callout,
  Game,
  Player
};
