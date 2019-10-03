import { clearCurrentPoll, getCurrentCallout } from "../db";

export const Query = {
  callout: async () => await getCurrentCallout()
};

export const Mutation = {
  async endCallout(_, args, { pubsub }) {
    await clearCurrentPoll();
    pubsub.publish("new-instructions");
    pubsub.publish("callout", { callout: null });
    return true;
  }
};

export const Subscription = {
  callout: {
    subscribe: (_, args, { pubsub }) => pubsub.asyncIterator("callout")
  }
};

export const Callout = {
  __resolveType: parent => {
    if (parent.name === "Audience Poll") return "AudiencePoll";
    if (parent.name === "Spotlight") return "Spotlight";
    if (parent.name === "Faces") return "Faces";
  }
};
