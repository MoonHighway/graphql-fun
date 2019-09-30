import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Whoops404 } from "./ui";
import ThemeProvider from "./theme";
import Board from "./Board";
import PickPlayer from "./Board/Games/PickPlayer";
import Player from "./Player";
import Samples from "./Board/Samples";
import Admin from "./Admin";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Player} />
          <Route exact path="/board" component={Board} />
          <Route exact path="/pick" component={PickPlayer} />
          <Route exact path="/samples" component={Samples} />
          <Route exact path="/admin" component={Admin} />
          <Route component={Whoops404} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}
