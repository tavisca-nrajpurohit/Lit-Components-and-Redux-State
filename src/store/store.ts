import { createStore,combineReducers } from '@rakoon-badshah/dynamic-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {rootReducer} from './rootReducer';

export const store = createStore(combineReducers({
    app: rootReducer
}),composeWithDevTools());