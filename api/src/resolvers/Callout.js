import { clearCurrentPoll, getCurrentCallout, startCallout } from "../db";

export const Query = {
  callout: async () => await getCurrentCallout()
};

export const Mutation = {
  async thankYou(_, __, { pubsub, isAdmin }) {
    if (!isAdmin) {
      throw new Error("only Alex can say thank you");
    }
    await startCallout("Thank You", "playing");
    pubsub.publish("new-instructions");
    pubsub.publish("callout", {
      callout: { name: "Thank You", state: "playing" }
    });
    return true;
  },
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
    if (parent.name === "Thank You") return "ThankYou";
  }
};
