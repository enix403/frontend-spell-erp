import * as React from 'react';

import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { lazyLoad } from 'utils/loadable';

export const OtherPage = lazyLoad(
    () => import('./index'),
    module => module.OtherPage,
    {
        fallback: <LoadingIndicator />,
    },
);
