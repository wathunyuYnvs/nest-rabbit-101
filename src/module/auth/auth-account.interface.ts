export enum AuthType {
    EMAIL = 'email',
}

export interface JwtPayload {
    access_token?: string;
    refresh_token?: string;
    verifyToken?: string;
}

export enum SignedType {
    RESTFUL = 'restful',
    REFRESH = 'refresh',
    ACTIVATE = 'activate',
    SOCKET = 'socket',
}

export interface AuthPayload {
    signedType: SignedType;
    userId?: number;
    exp?: string;
    iat?: string;
}
