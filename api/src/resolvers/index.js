import * as connections from "./Connections";
import * as authorization from "./Authorization";
import * as teams from "./Teams";
import * as selectPlayer from "./SelectPlayer";
import * as audiencePoll from "./AudiencePoll";
import * as spotlight from "./Spotlight";
import * as faces from "./Faces";
import * as perfIsRight from "./PerfIsRight";
import * as perfIsRightFinal from "./PerfIsRightFinal";
import * as wejay from "./Wejay";
import * as fightjay from "./Fightjay";

import {
  Callout,
  Mutation as calloutMutation,
  Query as calloutQuery,
  Subscription as calloutSubscription
} from "./Callout";
import {
  Game,
  Mutation as gameMutation,
  Query as gameQuery,
  Subscription as gameSubscription
} from "./Game";
import { Player } from "./Player";

export default {
  Query: {
    ...connections.Query,
    ...authorization.Query,
    ...teams.Query,
    ...calloutQuery,
    ...gameQuery
  },
  Mutation: {
    ...connections.Mutation,
    ...teams.Mutation,
    ...authorization.Mutation,
    ...selectPlayer.Mutation,
    ...audiencePoll.Mutation,
    ...spotlight.Mutation,
    ...faces.Mutation,
    ...perfIsRight.Mutation,
    ...perfIsRightFinal.Mutation,
    ...wejay.Mutation,
    ...fightjay.Mutation,
    ...gameMutation,
    ...calloutMutation
  },
  Subscription: {
    ...authorization.Subscription,
    ...calloutSubscription,
    ...gameSubscription,
    ...connections.Subscription
  },
  Color: teams.Color,
  Callout,
  Game,
  PerfIsRight: perfIsRight.PerfIsRight,
  Fightjay: fightjay.Fightjay,
  Player
};
