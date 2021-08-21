import * as React from 'react';

import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { lazyLoad } from 'utils/loadable';

export const LoginPage = lazyLoad(
    () => import('./index'),
    module => module.LoginPage,
    {
        fallback: <LoadingIndicator />,
    },
);
