import fetch from "node-fetch";
import faker from "faker";

const requestGithubToken = credentials =>
  fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(credentials)
  }).then(res => res.json());

const requestGithubUserAccount = token =>
  fetch(`https://api.github.com/user?access_token=${token}`).then(res =>
    res.json()
  );

export const authorizeWithGithub =
  process.env.REACT_APP_TEST_PLAYERS !== "true"
    ? async credentials => {
        const { access_token } = await requestGithubToken(credentials);
        const githubUser = await requestGithubUserAccount(access_token);
        return { ...githubUser, access_token };
      }
    : () => ({
        message: null,
        access_token: faker.random.uuid().replace(/-/g, ""),
        avatar_url: faker.image.avatar(),
        login: faker.internet.userName(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email()
      });

export const breakIntoGroups = (cnt = 2, items = []) => {
  let containers = [];
  containers = [...Array(cnt)].map(() => []);
  return items.reduce((groups, item, i) => {
    groups[i % cnt] = [...groups[i % cnt], item];
    return groups;
  }, containers);
};

export const printEnv = () => {
  console.log("\n\nenvironment variables\n=================");
  console.log("NODE_ENV", process.env.NODE_ENV);
  console.log(
    "REACT_APP_GRAPHQL_ENDPOINT",
    process.env.REACT_APP_GRAPHQL_ENDPOINT
  );
  console.log(
    "REACT_APP_GRAPHQL_SUBSCRIPTIONS",
    process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS
  );
  console.log(
    "REACT_APP_GITHUB_CLIENT_ID",
    process.env.REACT_APP_GITHUB_CLIENT_ID
  );
  console.log("GITHUB_CLIENT_SECRET", process.env.GITHUB_CLIENT_SECRET);
  console.log("TEST_PLAYERS", process.env.REACT_APP_TEST_PLAYERS);
  console.log(
    "REACT_APP_MAX_CONNECTIONS",
    process.env.REACT_APP_MAX_CONNECTIONS
  );
  console.log(
    "REACT_APP_WEJAY_MAX_FACES",
    process.env.REACT_APP_WEJAY_MAX_FACES
  );
  console.log("ADMIN_SECRET", process.env.ADMIN_SECRET);
  console.log("=================\n\n");
};
