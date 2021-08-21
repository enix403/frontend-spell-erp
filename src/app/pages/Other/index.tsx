import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { AppLayout, PageTitle, PageContent } from 'app/layout';
import { linkNames } from 'app/routing/routes';

import { Button, Intent, Spinner } from '@blueprintjs/core';
import jwt_decode from "jwt-decode";


const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzEyNzc0OTMsImp0aSI6InJlZi1kOWRiNWY1Ny1mMTg5LTQxZjEtYTIyMS1kMjNlOTJkZTlmZjAiLCJ1c2VyaWQiOjEsInRrX3R5cGUiOiJyZWYifQ.sAXJZoM52PQN9mNB7ewo9kCXG-WWcKFwK2fVnLS2bhA";

export const OtherPage = () => {

    const handleClick = () => {
        const decoded = jwt_decode(token);
        console.log(decoded);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Other Page</title>
            </Helmet>
            <AppLayout sidebarActiveLinkNames={[linkNames.Other]}>
                <PageTitle text="A Very Secret Page" />
                <PageContent>
                    <p>Congrats You are at a Other route</p>

                    <Button
                        intent={Intent.SUCCESS}
                        text="Send"
                        minimal={true}
                        onClick={e => handleClick()}
                        rightIcon="circle-arrow-right"
                    />
                    {/*<Spinner intent={Intent.PRIMARY} size={170} />*/}
                </PageContent>
            </AppLayout>
        </React.Fragment>
    );
};
