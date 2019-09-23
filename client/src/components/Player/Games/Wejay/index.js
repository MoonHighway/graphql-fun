import React from "react";
import Musician from "./Musician";
import Audience from "./Audience";

export default function Wejay({ instrument }) {
  return instrument ? <Musician instrument={instrument} /> : <Audience />;
}
