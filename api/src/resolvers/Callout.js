import { clearCurrentPoll, getCurrentCallout } from "../db";

export const Query = {
  callout: async () => await getCurrentCallout()
};

export const Mutation = {
  async endCallout() {
    await clearCurrentPoll();
    return true;
  }
};

export const Callout = {
  __resolveType: parent => {
    if (parent.name === "Audience Poll") return "AudiencePoll";
  }
};
