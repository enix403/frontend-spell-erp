import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import * as selectors from './selectors';

import { slice } from './main';
import { loginSaga } from './sagas';

// export const { AuthState } = hetypes;
export const { actions } = slice;
export const { selectAuthState, selectUserInfo } = selectors;

export const useLoginSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: loginSaga });
    return { actions: slice.actions };
};
