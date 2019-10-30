import React from "react";
import styled from "styled-components";

export function ThankYou() {
  return (
    <Container>
      <h1>Thank You</h1>
      <div>
        <p>
          Thanks for participating in GraphQL.fun. and having a good time with
          me. <a href="https://twitter.com/MoonTahoe">@moontahoe</a>
        </p>
        <p>
          Music from
          <a href="https://soundcloud.com/funksalot">Funksalot on Soundcloud</a>
        </p>
      </div>
      <iframe
        width="100%"
        height="100"
        scrolling="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/680194655&color=%237c7c7c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
      ></iframe>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: white;
  text-align: center;

  > div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  p {
    font-size: 3em;
    color: white;
    font-family: ${props => props.theme.fonts.creativeLight};

    &:first-child {
      a {
        display: block;
      }
    }

    &:last-child {
      font-size: 2em;
    }
  }

  a {
    color: ${props => props.theme.colors.contrast};
  }

  h1 {
    font-family: ${props => props.theme.fonts.fun};
    color: ${props => props.theme.colors.primary};
    text-align: center;
    font-size: 5em;
    margin-top: 1em;
  }
`;
