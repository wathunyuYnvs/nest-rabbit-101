export interface IRedisService {
    getAsync(key: string): Promise<string>;
    setAsync(key: string, value: string): Promise<void>;
    delAsync(key: string): Promise<void>;
}

export interface IRedisConfig {
    host: string;
    port: number;
}
