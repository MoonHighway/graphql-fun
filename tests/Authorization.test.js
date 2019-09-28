import { authorizeTestUser, getGithubAuthUrl } from "./helpers";

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
});

describe("authorizing a real player with github", () => {
  test.todo("mutation - githubAuthorization (real player)");
});
