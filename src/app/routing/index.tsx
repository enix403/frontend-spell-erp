import * as React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { history } from './history';
import { routePaths } from './routes';

import { AdminManagePage } from '../pages/AdminManage/Loadable';
import { OtherPage } from '../pages/Other/Loadable';
import { NotFoundPage } from '../components/NotFoundPage/Loadable';

export const AppRouter = () => {
    return (
        <Router history={history}>
            <Switch>
                <Redirect exact from="/" to={routePaths.manage} />
                <Route path={routePaths.manage} component={AdminManagePage} />
                <Route path={routePaths.other} component={OtherPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    );
};
