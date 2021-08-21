import { configureStore, getDefaultMiddleware, StoreEnhancer } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { createRootReducer } from './root-reducer';

function configureAppStore() {
    const sagaMiddleware = createSagaMiddleware({});
    const runSaga = sagaMiddleware.run;

    // Custom middlewares
    const middlewares = [sagaMiddleware];

    const enhancers: StoreEnhancer[] = [
        createInjectorsEnhancer({
            createReducer: createRootReducer,
            runSaga: runSaga,
        }),
    ];

    const store = configureStore({
        reducer: createRootReducer(),
        middleware: [...getDefaultMiddleware(), ...middlewares],
        enhancers: enhancers,
        devTools: process.env.NODE_ENV !== 'production',
    });

    return store;
}

export const store = configureAppStore();
