import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import {
    AuthState,
    LoginInitPayload,
    LoginFailedPayload,
    LoginSuccessPayload,
    TokenRefreshPayload,
} from './types';

import { 
    loadAuthFromStorage, 
    clearAuthFromStorage,
    saveAuthToStorage,
    resetState 
} from './helpers';

import { history } from 'app/routing/history';

const initialState: AuthState = {
    loggedIn: false,
    message: null,
    authStatus: 'unauthenticated',
    user: null,
    tokens: { access: '', refreshID: loadAuthFromStorage() },
};

export const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginInit(state, action: PayloadAction<LoginInitPayload>) {
            resetState(state);
            state.authStatus = 'logging';
            clearAuthFromStorage();
        },
        loginSuccess(state, action: PayloadAction<LoginSuccessPayload>) {
            resetState(state);
            state.loggedIn = true;
            state.authStatus = 'logged-in';

            state.tokens.access = action.payload.accessToken;
            state.tokens.refreshID = action.payload.refreshTokenID;
            state.user = action.payload.userInfo;

            saveAuthToStorage(state.tokens.refreshID);
        },
        loginFailed(state, action: PayloadAction<LoginFailedPayload>) {
            resetState(state);
            state.authStatus = 'failed';
            state.message = action.payload;

            clearAuthFromStorage();
        },
        logoutInit(state, action) {
            state.loggedIn = false;
            state.authStatus = 'logging-out'
        },
        logout(state) {
            resetState(state);
            clearAuthFromStorage();
            history.replace('/');
        },
        tokenRefreshInit(state, action) {
            state.authStatus = 'refreshing-access-token';
        },
        accessTokenRefreshed(state, action: PayloadAction<TokenRefreshPayload>) {
            state.loggedIn = true;
            state.authStatus = 'logged-in';
            const { userInfo, newAccessToken } = action.payload;
            state.tokens.access = newAccessToken;

            if (userInfo !== null) {
                state.user = userInfo;
            }
        },
    },
});
