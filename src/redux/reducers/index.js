import { combineReducers } from 'redux';
import { stores} from './instances';
import {  countries } from './countries';

export default combineReducers({
    instance,
    instances,
    instancesError,
    instancesLoading,
    countries
});