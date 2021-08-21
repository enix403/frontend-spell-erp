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
    loadRefreshTokenFromStorage, 
    clearTokenFromStorage,
    saveTokenToStorage,
    resetState 
} from './helpers';

import { history } from 'app/routing/history';

const initialState: AuthState = {
    loggedIn: false,
    message: null,
    authStatus: 'unauthenticated',
    user: null,
    tokens: { access: '', refresh: loadRefreshTokenFromStorage() },
};

export const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginInit(state, action: PayloadAction<LoginInitPayload>) {
            resetState(state);
            state.authStatus = 'logging';
            clearTokenFromStorage();
        },
        loginSuccess(state, action: PayloadAction<LoginSuccessPayload>) {
            resetState(state);
            state.loggedIn = true;
            state.authStatus = 'logged-in';

            state.tokens.access = action.payload.accessToken;
            state.tokens.refresh = action.payload.refreshToken;

            const { userInfo } = action.payload;
            state.user = userInfo;
            saveTokenToStorage(action.payload.refreshToken);
        },
        loginFailed(state, action: PayloadAction<LoginFailedPayload>) {
            resetState(state);
            state.authStatus = 'failed';
            state.message = action.payload;

            clearTokenFromStorage();
        },
        logout(state) {
            resetState(state);
            clearTokenFromStorage();
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
