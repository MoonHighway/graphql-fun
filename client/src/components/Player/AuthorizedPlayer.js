import React from "react";
import { useAuth } from "../../hooks";
import { GithubLoginButton, LoadingScreen } from "../ui";
import { withRouter } from "react-router-dom";

function AuthorizedPlayer({ history }) {
  const { loading, error, authorize } = useAuth(history);

  if (loading) return <LoadingScreen />;
  else if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return <GithubLoginButton onClick={authorize} />;
}

export default withRouter(AuthorizedPlayer);
