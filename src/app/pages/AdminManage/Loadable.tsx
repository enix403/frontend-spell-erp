import * as React from 'react';

import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { lazyLoad } from 'utils/loadable';

export const AdminManagePage = lazyLoad(
    () => import('./index'),
    module => module.AdminManagePage,
    {
        fallback: <LoadingIndicator />,
    },
);
