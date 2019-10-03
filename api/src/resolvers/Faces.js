import { createNewFaces } from "../db";

export const Mutation = {
  async startFaces(_, args, { pubsub, isAdmin }) {
    if (!isAdmin) {
      throw new Error("Only Alex can start the Faces flying");
    }
    const callout = await createNewFaces();
    pubsub.publish("callout", { callout });
    pubsub.publish("new-instructions");
    return callout;
  }
};
