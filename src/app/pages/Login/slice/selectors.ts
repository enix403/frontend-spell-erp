import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

export const selectAuthState = createSelector(
    [(state: RootState) => state.auth],
    authState => authState,
);

// export const selectLoggedIn = createSelector([(state: RootState) => state.auth.loggedIn], loggedIn => loggedIn);
// export const selectAuthStatus = createSelector([(state: RootState) => state.auth.authStatus], authStatus => authStatus);
// export const selectTokens = createSelector([(state: RootState) => state.auth.tokens], tokens => tokens);
export const selectUserInfo = createSelector(
    [(state: RootState) => state.auth.user],
    userInfo => userInfo,
);
