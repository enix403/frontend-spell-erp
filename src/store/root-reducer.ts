import { combineReducers } from '@reduxjs/toolkit';
import { InjectedReducersType } from 'utils/injector-typings';

export function createRootReducer(injectedReducers: InjectedReducersType = {}) {
    if (Object.keys(injectedReducers).length == 0) {
        return state => state;
    }
    return combineReducers(injectedReducers);
}
