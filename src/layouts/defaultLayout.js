
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Todo from '../containers/todo';

const Default = () => (
    <div>
        <Switch>
            <Route path="/" exact component={Todo} />
        </Switch>
    </div>
);

export default Default;