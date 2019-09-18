import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { PlayerScreen } from './Player'
// import { BoardScreen, PickPlayer } from './Board'
// import { Whoops404 } from './ui'

const PlayerScreen = () => <h1>Player Screen</h1>;
const BoardScreen = () => <h1>Board Screen</h1>;
const PickPlayer = () => <h1>Pick Player</h1>;
const Whoops404 = () => <h1>404 Error</h1>;

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PlayerScreen} />
        <Route exact path="/board" component={BoardScreen} />
        <Route exact path="/pick" component={PickPlayer} />
        <Route component={Whoops404} />
      </Switch>
    </BrowserRouter>
  );
}
