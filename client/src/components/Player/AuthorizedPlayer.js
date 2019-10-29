import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks";
import { GithubLoginButton, LoadingScreen } from "../ui";
import { withRouter } from "react-router-dom";
import { checkForMobile } from "../../lib";
import { FaMobileAlt } from "react-icons/fa";
import styled from "styled-components";

const AgreementForm = ({ onAgree = f => f }) => {
  const [here, setHere] = useState(false);
  const [nope, setNope] = useState("");

  useEffect(() => {
    if (!window.performance)
      setNope(
        "The performance API was not detected on this mobile browser. In order to participate your browser must have the performance API."
      );
  }, []);

  if (nope)
    return (
      <Message>
        <h1>We're sorry...</h1>
        <p>{nope},</p>
      </Message>
    );

  if (!here)
    return (
      <Message>
        <h1>Are you at GraphQL Summit?</h1>
        <p>
          You must physically be at GraphQL Summit to participate in the demo.
        </p>
        <div className="buttons">
          <button onClick={e => setHere(here => !here)}>Yes</button>
          <button
            onClick={e =>
              setNope(
                "You must physically be at GraphQL Summit to participate in the demo."
              )
            }
          >
            No
          </button>
        </div>
      </Message>
    );

  return (
    <Message>
      <h1>Are you willing to come on stage?</h1>
      <p>We will pick 4 players at random and ask them to come on stage.</p>
      <div className="buttons">
        <button onClick={onAgree}>Yes</button>
        <button
          onClick={e =>
            setNope(
              "The demo will be used to pick 4 players at random who will be asked to come on stage."
            )
          }
        >
          No
        </button>
      </div>
    </Message>
  );
};

function AuthorizedPlayer({ history }) {
  const [showAgree, setShowAgree] = useState(false);
  const [isMobile] = useState(
    process.env.REACT_APP_TEST_PLAYERS === "true"
      ? true
      : checkForMobile() && window.performance
  );
  const { loading, error, authorize } = useAuth(history);

  if (loading) return <LoadingScreen />;
  else if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  if (showAgree) return <AgreementForm onAgree={authorize} />;

  if (!isMobile) {
    return (
      <Container>
        <FaMobileAlt />
        <p>Please connect with your mobile device.</p>
      </Container>
    );
  }

  return (
    <GithubLoginButton
      onClick={() => {
        if (process.env.REACT_APP_ASK_PLAYERS === "true") return authorize();
        setShowAgree(true);
      }}
    />
  );
}

const Message = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
`;

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
