import fetch from "node-fetch";

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

export const authorizeWithGithub = async credentials => {
  const { access_token } = await requestGithubToken(credentials);
  const githubUser = await requestGithubUserAccount(access_token);
  return { ...githubUser, access_token };
};

export const breakIntoGroups = (cnt = 2, items = []) => {
  let containers = [];
  containers = [...Array(cnt)].map(() => []);
  return items.reduce((groups, item, i) => {
    groups[i % cnt] = [...groups[i % cnt], item];
    return groups;
  }, containers);
};

export const printEnv = (
  values = ["NODE_ENV", "PORT", "GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"]
) => {
  console.log("\n\nenvironment variables\n=================");
  values.forEach(v => console.log(v, process.env[v]));
  console.log("=================\n\n");
};
