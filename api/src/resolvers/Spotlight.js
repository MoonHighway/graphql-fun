import { createNewSpotlight } from "../db";

export const Mutation = {
  async startSpotlight(_, args, { pubsub, isAdmin }) {
    if (!isAdmin) {
      throw new Error("Only Alex can start a spotlight");
    }
    const callout = await createNewSpotlight();
    pubsub.publish("callout", { callout });
    pubsub.publish("new-instructions");
    return callout;
  }
};
