// import { CounterStoreState } from 'app/pages/HomePage/slice';
import { AuthState } from 'app/pages/Login/slice/types';

export interface RootState {
    // counter?: CounterStoreState;
    auth: AuthState;
}
