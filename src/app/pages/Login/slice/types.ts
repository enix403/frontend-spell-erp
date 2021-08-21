export type AuthLoginStatus =
    | 'unauthenticated'
    | 'logging'
    | 'failed'
    | 'logged-in'
    | 'refreshing-access-token';
export interface UserInfo {
    name: string;
    username: string;
    authrole: string;
    staffrole: string;
    college?: {
        id: number;
        name: string;
    };
    // permissions: Map<string, Array<string>>;
    permissions: Object;
}

export interface AuthState {
    loggedIn: boolean;
    authStatus: AuthLoginStatus;
    message: string | null;
    user: UserInfo | null;
    tokens: {
        access: string;
        refresh: string;
    };
}

export interface LoginInitPayload {
    username: string;
    password: string;
}

export type LoginFailedPayload = string; // message

export interface LoginSuccessPayload {
    accessToken: string;
    refreshToken: string;

    userInfo: UserInfo;
}

export type AccessTokenType = string;
export type RefreshTokenType = string;

export interface TokenRefreshPayload {
    newAccessToken: AccessTokenType;
    userInfo: UserInfo | null;
}
