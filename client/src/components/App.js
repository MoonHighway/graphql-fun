import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Player from "./Player";
import ThemeProvider from "./theme";
import Board, { PickPlayer } from "./Board";
import { Whoops404 } from "./ui";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Player} />
          <Route exact path="/board" component={Board} />
          <Route exact path="/pick" component={PickPlayer} />
          <Route component={Whoops404} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}
