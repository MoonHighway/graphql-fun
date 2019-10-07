import React from "react";

export function Fightjay({ game }) {
  return <pre>{JSON.stringify(game, null, 2)}</pre>;
}
