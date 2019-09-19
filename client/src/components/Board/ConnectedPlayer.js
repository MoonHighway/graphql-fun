import React from "react";
import { useRandomPosition } from "../../hooks";
import styled from "styled-components";

export const ConnectedPlayer = ({ avatar, login, team }) => {
  const [top, left] = useRandomPosition(window.innerHeight, window.innerWidth);

  return (
    <Container teamColor={team && team.color.name} top={top} left={left}>
      <img src={avatar} alt={login} />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: ${props => props.top};
  left: ${props => props.left};
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: solid 5px
      ${props =>
        props.teamColor ? props.teamColor : props.theme.colors.contrast};
  }
`;
