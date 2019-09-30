import { clearCurrentPoll } from "../db";

export const Mutation = {
  async endCallout() {
    await clearCurrentPoll();
    return true;
  }
};

export const Callout = {
  __resolveType: parent => {
    console.log("TODO: Implement Resolver Type");
    return "Wejay";
  }
};
