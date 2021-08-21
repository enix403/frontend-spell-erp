import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { AppLayout, PageTitle, PageContent } from 'app/layout';
import { useHistory } from 'react-router';
import { linkNames } from 'app/routing/routes';

export const AdminManagePage = () => {
    const history = useHistory();
    return (
        <React.Fragment>
            <Helmet>
                <title>AdminManage Page</title>
            </Helmet>
            <AppLayout sidebarActiveLinkNames={[linkNames.Manage]}>
                <PageTitle text="Manage" />
                <PageContent></PageContent>
            </AppLayout>
        </React.Fragment>
    );
};
