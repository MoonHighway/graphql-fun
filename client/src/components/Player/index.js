import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { PLAYER_ROOT_QUERY } from "../../operations";
// import { LoadingScreen } from '../ui'
// import { Welcome } from './ui/Welcome'
// import { CurrentPlayer } from './CurrentPlayer'

const LoadingScreen = () => <h1>Loading</h1>;
const Welcome = () => <h1>Welcome</h1>;
const CurrentPlayer = props => (
  <ul>
    {Object.keys(props).map((key, i) => (
      <li key={i}>
        {key}: {props[key]}
      </li>
    ))}
  </ul>
);

export default function Player() {
  const { loading, data, error } = useQuery(PLAYER_ROOT_QUERY);

  if (loading) return <LoadingScreen />;
  else if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  else if (!data || !data.me) return <Welcome />;

  return <CurrentPlayer {...data.me} />;
}
