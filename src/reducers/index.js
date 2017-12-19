import { combineReducers } from 'redux';
import todoReducer from './todoList';

const rootReducer = combineReducers({todoReducer});
export default rootReducer;