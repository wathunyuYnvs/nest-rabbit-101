import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
    jwtSecret: process.env.JWT_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
    activateTokenExpiration: process.env.ACTIVATE_TOKEN_EXPIRATION,
    saltRounds: parseInt(process.env.SALT_ROUNDS),
}));
