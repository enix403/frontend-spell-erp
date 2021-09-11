import { AuthState } from './types';

const STORAGE_AUTH_HANDLE_KEY = 'ref_tk_id';

export function loadAuthFromStorage(): string {
    if (!window.localStorage) {
        return '';
    }
    return window.localStorage.getItem(STORAGE_AUTH_HANDLE_KEY) || '';
}

export function clearAuthFromStorage() {
    if (window.localStorage) {
        window.localStorage.removeItem(STORAGE_AUTH_HANDLE_KEY);
    }
}

export function saveAuthToStorage(handle: string) {
    if (window.localStorage) {
        try {
            window.localStorage.setItem(STORAGE_AUTH_HANDLE_KEY, handle);
        }
        catch (err) {}
    }
}

export function resetState(state: AuthState) {
    state.loggedIn = false;
    state.message = null;
    state.authStatus = 'unauthenticated';
    state.user = null;
    state.tokens = { access: '', refreshID: '' };
}
