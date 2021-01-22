import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Lobby from './features/Lobby';
import Game from './features/Game';

const definitions = [{
    path: '/',
    component: Lobby,
}, {
    path: '/:token',
    component: Game,
}];

const Routes = () => (
    <Switch>
        { definitions.map(({ path, component, exact = true }) => (
            <Route key={path} path={path} component={component} exact={exact} />
        ))}
        <Route component={() => <h1>404</h1>} />
    </Switch>
)

export default Routes;
