
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Todo from '../containers/todo';
import ImgUpload from '../containers/imgUpload';

const Default = () => (
    <div>
        <Switch>
            <Route path="/" exact component={Todo} />
            <Route path="/img" exact component={ImgUpload}/>
        </Switch>
    </div>
);

export default Default;