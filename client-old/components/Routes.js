import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { PlayerScreen } from './Player'
import { BoardScreen, PickPlayer } from './Board'
import { Whoops404 } from './ui'

export const Routes = () =>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={PlayerScreen} />
            <Route exact path="/board" component={BoardScreen} />
            <Route exact path="/pick" component={PickPlayer} />
            <Route component={Whoops404} />
        </Switch>
    </BrowserRouter>