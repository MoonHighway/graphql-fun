import { authorizeTestUser, getGithubAuthUrl } from "./helpers";

describe("Authorization", () => {
  describe("requesting github auth link", () => {
    it("receives github auth link", async () => {
      const data = await getGithubAuthUrl();
      expect(data).toEqual({
        githubAuthorizationUrl: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`
      });
    });
  });

  describe("authorizing a test player", () => {
    let data;
    beforeAll(async () => {
      data = await authorizeTestUser();
    });
    it("returns a token", () => {
      const { token } = data.githubAuthorization;
      expect(token).toBeDefined();
      expect(typeof token).toEqual("string");
    });
    it("returns a login", () => {
      const { login } = data.githubAuthorization.player;
      expect(login).toBeDefined();
      expect(typeof login).toEqual("string");
    });
    it("returns a name", () => {
      const { name } = data.githubAuthorization.player;
      expect(name).toBeDefined();
      expect(typeof name).toEqual("string");
    });
    it("returns a avatar", () => {
      const { avatar } = data.githubAuthorization.player;
      expect(avatar).toBeDefined();
      expect(typeof avatar).toEqual("string");
    });
    it("returns an instrument", () => {
      const { instrument } = data.githubAuthorization.player;
      expect(instrument).toEqual(null);
    });
  });
});
