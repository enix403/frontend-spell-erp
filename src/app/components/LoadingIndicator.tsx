import * as React from 'react';
import styled from 'styled-components/macro';
import { AppLayout } from 'app/layout';
import { Spinner, Intent } from '@blueprintjs/core';

const LoadingWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LoadingIndicator = () => {
    return (
        <LoadingWrapper>
            <Spinner intent={Intent.DANGER} size={170} />
        </LoadingWrapper>
    );
};

export const PageLoaderIndicator = () => {
    return (
        <React.Fragment>
            <AppLayout>
                <LoadingIndicator />
            </AppLayout>
        </React.Fragment>
    );
};
