/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';

import 'styles/vendor/normalize.min.css';

import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import 'styles/base.css';
import 'styles/global.css';
import 'styles/base-overrides.css';

import { AppRouter } from './routing';
import { LoginPage } from './pages/Login/Loadable';
import {
    useLoginSlice,
    // selectTokens,
    // selectLoggedIn,
    // selectAuthStatus,
    selectAuthState,
    actions as AuthActions,
} from './pages/Login/slice';
import { LoadingIndicator } from './components/LoadingIndicator';

export function App() {
    useLoginSlice();
    const authState = useSelector(selectAuthState);
    const dispatch = useDispatch();

    const loggedIn = authState.loggedIn;
    const authStatus = authState.authStatus;
    const tokens = authState.tokens;

    let mainComponent: React.ReactNode;

    // WARNING: Some really messed up convoluted nonsense logic

    const shouldRefresh = tokens.refresh !== '' && authStatus !== 'refreshing-access-token';

    if (!loggedIn) {
        if (shouldRefresh || authStatus === 'refreshing-access-token') {
            mainComponent = <LoadingIndicator />;
            if (shouldRefresh) {
                dispatch(AuthActions.tokenRefreshInit(null));
            }
        } else {
            mainComponent = <LoginPage />;
        }
    } else {
        mainComponent = <AppRouter />;
    }

    return (
        <React.Fragment>
            <Helmet titleTemplate="%s - ERP" defaultTitle="ERP">
                <meta name="description" content="ERP Application" />
            </Helmet>
            {mainComponent}
        </React.Fragment>
    );
}
