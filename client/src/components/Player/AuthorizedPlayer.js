import React, { useState } from "react";
import { useAuth } from "../../hooks";
import { GithubLoginButton, LoadingScreen } from "../ui";
import { withRouter } from "react-router-dom";
import { checkForMobile } from "../../lib";
import { FaMobileAlt } from "react-icons/fa";
import styled from "styled-components";

function AuthorizedPlayer({ history }) {
  const [isMobile] = useState(
    process.env.REACT_APP_TEST_PLAYERS === "true"
      ? true
      : checkForMobile() && window.performance
  );
  const { loading, error, authorize } = useAuth(history);

  if (loading) return <LoadingScreen />;
  else if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  if (!isMobile) {
    return (
      <Container>
        <FaMobileAlt />
        <p>Please connect with your mobile device.</p>
      </Container>
    );
  }

  return <GithubLoginButton onClick={authorize} />;
}

const Container = styled.div`
  width: 500px;
  color: white;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin: 0 0.25em;
    font-size: 4em;
  }
  p {
    text-align: center;
  }
`;

export default withRouter(AuthorizedPlayer);
