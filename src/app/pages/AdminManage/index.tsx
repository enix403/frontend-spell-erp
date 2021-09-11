import * as React from 'react';
import { Helmet } from 'react-helmet-async';

// import styled from 'styled-components/macro';

import { AppLayout, PageTitle, PageContent } from 'app/layout';
import { linkNames } from 'app/routing/routes';

import { Button, Intent, Toaster, Position } from '@blueprintjs/core';

const AppToaster = Toaster.create({
    className: "",
    position: Position.BOTTOM_LEFT,
    maxToasts: 7
});

export const AdminManagePage = () => {
    const handle = () => {
        // AppToaster.show({
        //     action: {
        //         onClick: () => {},
        //         text: "Retry",
        //     },
        //     icon: "warning-sign",
        //     intent: Intent.DANGER,
        //     message: "You do not have permissions to perform this action."
        // });

        AppToaster.show({
            icon: "build",
            message: (
                <>
                    Entity <strong>LBC1</strong> created successfully.      
                </>
            ),
            intent: "success"
        });
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>AdminManage Page</title>
            </Helmet>
            <AppLayout sidebarActiveLinkNames={[linkNames.Manage]}>
                <PageTitle text="Manage" />
                <PageContent>
                    <Button onClick={() => handle()} text="Show me" intent={Intent.PRIMARY} /> 
                </PageContent>
            </AppLayout>
        </React.Fragment>
    );
};

{/*const WrappedOmnibar = styled(Omnibar)`
    filter: blur(0);
    opacity: 1;
    background-color: #fff;
    border-radius: 3px;
    -webkit-box-shadow: 0 0 0 1px rgba(16,22,26,.1),0 4px 8px rgba(16,22,26,.2),0 18px 46px 6px rgba(16,22,26,.2);
    box-shadow: 0 0 0 1px rgba(16,22,26,.1),0 4px 8px rgba(16,22,26,.2),0 18px 46px 6px rgba(16,22,26,.2);
    left: calc(50% - 250px);
    top: 20vh;
    width: 500px;
    z-index: 21;
`;*/}