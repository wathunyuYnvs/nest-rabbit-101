import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
}));
