import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
    nodeEnv: process.env.NODE_ENV || 'local',
    name: process.env.PROJECT_NAME,
    apiPrefix: process.env.API_PREFIX || 'v1',
    version: process.env.VERSION,
    port: parseInt(process.env.PORT) || 3000,
}));
