import React from "react";
import PickPlayer from "../PickPlayer";

export function PerfIsRight({
  game: {
    state,
    name,
    maxPlayers = 100,
    minPlayers = 1,
    playerCount = 0,
    players = []
  }
}) {
  const startGame = () => {
    console.log("TODO: Start Game");
  };

  if (state === "picking players")
    return (
      <PickPlayer
        maxPlayers={maxPlayers}
        minPlayers={minPlayers}
        onStartGame={startGame}
        count={playerCount}
      />
    );

  return (
    <h1>
      {state} - {name} - {maxPlayers} - {minPlayers}
    </h1>
  );
}
