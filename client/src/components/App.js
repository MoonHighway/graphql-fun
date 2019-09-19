import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Player from "./Player";
import ThemeProvider from "./theme";
// import { BoardScreen, PickPlayer } from './Board'
import { Whoops404 } from "./ui";

const BoardScreen = () => <h1>Board Screen</h1>;
const PickPlayer = () => <h1>Pick Player</h1>;

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Player} />
          <Route exact path="/board" component={BoardScreen} />
          <Route exact path="/pick" component={PickPlayer} />
          <Route component={Whoops404} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}
