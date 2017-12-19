import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';
import { composeWithDevTools } from 'redux-devtools-extension';


const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(
    rootReducer, 
    composeWithDevTools(
        applyMiddleware(epicMiddleware), 
    )
);

export default store;