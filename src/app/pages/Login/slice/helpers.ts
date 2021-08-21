import { AuthState } from './types';

export function loadRefreshTokenFromStorage(): string {
    if (!window.localStorage) {
        return '';
    }
    return window.localStorage.getItem('ref_token') || '';
}

export function clearTokenFromStorage() {
    if (window.localStorage) {
        window.localStorage.removeItem('ref_token');
    }
}

export function saveTokenToStorage(token: string) {
    if (window.localStorage) {
        try {
            window.localStorage.setItem('ref_token', token);
        }
        catch (err) {}
    }
}

export function resetState(state: AuthState) {
    state.loggedIn = false;
    state.message = null;
    state.authStatus = 'unauthenticated';
    state.user = null;
    state.tokens = { access: '', refresh: '' };
}
