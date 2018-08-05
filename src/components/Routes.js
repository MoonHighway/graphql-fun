import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { PlayerScreen } from './Player'
import { BoardScreen, PickPlayer } from './Board'
import { Whoops404 } from './ui'

export const Routes = () =>
    <HashRouter>
        <Switch>
            <Route exact path="/" component={PlayerScreen} />
            <Route exact path="/board" component={BoardScreen} />
            <Route exact path="/pick" component={PickPlayer} />
            <Route component={Whoops404} />
        </Switch>
    </HashRouter>