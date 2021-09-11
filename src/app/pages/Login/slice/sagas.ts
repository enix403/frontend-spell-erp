import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { unauthenticatedApiClient } from 'api';

import { store } from 'store/appstore';
import { slice } from './main';
import { LoginInitPayload, AccessTokenType, UserInfo } from './types';


const { actions } = slice;

async function fetchUserInfo(accessToken: AccessTokenType): Promise<UserInfo> {
    try {
        const response = await unauthenticatedApiClient.get('/spl1/api/auth/user-info/', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const payload = response.data.payload;
        const info = payload['info'];
        return {
            name: info['name'],
            username: info['username'],
            authrole: info['authrole'],
            staffrole: info['staffrole'],
            permissions: payload.permissions,
        };
    } catch (error) {
        return {
            name: '--ERROR--',
            username: '--ERROR--',
            authrole: '--ERROR--',
            staffrole: '--ERROR--',
            permissions: {},
        };
    }
}

function* performLogin(action: PayloadAction<LoginInitPayload>) {
    const { username, password } = action.payload;
    let response;
    try {
        response = yield call(unauthenticatedApiClient.post, '/spl1/api/auth/login/', {
            username,
            password,
        });
    } catch (error) {
        const data = error.response ? error.response.data : { message: 'Unhandled Error' };
        yield put(actions.loginFailed(data ? data.message : error.message));
        return;
    }

    const data = response.data['payload'];
    const userInfo: UserInfo = yield call(fetchUserInfo, data['access']);

    yield put(
        actions.loginSuccess({
            accessToken: data['access'],
            refreshTokenID: data['refresh_token_id'],
            userInfo,
        }),
    );
}

function* performLogout() {
    try {
        yield call(unauthenticatedApiClient.post, '/spl1/api/auth/logout/');
    } catch (error) {
        console.log(error);
    }
    finally {
        yield put(actions.logout());
    }
}


// const delay = ms => new Promise(res => setTimeout(res, ms));

function* refreshToken() {
    const refreshTokenID = store.getState().auth.tokens.refreshID;
    let response: any;

    try {
        response = yield call(
            unauthenticatedApiClient.post, 
            '/spl1/api/auth/refresh/', 
            {'refresh_token_id': refreshTokenID }
        );
    } catch (error) {
        const data = error.response ? error.response.data : { message: 'Unhandled Error' };
        yield put(actions.loginFailed(data ? data.message : error.message));
        return;
    }

    const newAccessToken = response.data['payload']['access'];
    let userInfo = null;
    const oldUserInfo = store.getState().auth.user;
    if (oldUserInfo === null) {
        userInfo = yield call(fetchUserInfo, newAccessToken);
    }

    yield put(
        actions.accessTokenRefreshed({
            newAccessToken,
            userInfo,
        })
    );
}

export function* loginSaga() {
    yield all([
        takeLatest(actions.loginInit, performLogin),
        takeLatest(actions.tokenRefreshInit, refreshToken),
        takeLatest(actions.logoutInit, performLogout),
    ]);
}
