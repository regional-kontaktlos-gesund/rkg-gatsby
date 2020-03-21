import { combineReducers } from 'redux';
import { stores} from './';
import {  countries } from './countries';


export function stores(state = [], action) {
    switch (action.type) {
        case 'SET_STORES':
            return [...state, action.data]
        default:
            return state;
    }
}
export function loading(state = false, action) {
    switch (action.type) {
        case 'LOADING':
            return action.loading;
        default:
            return state;
    }
}


export default combineReducers({
    instance,
    instances,
    instancesError,
    instancesLoading,
    countries
});