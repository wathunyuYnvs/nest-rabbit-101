export interface IExampleService {
    testGet(id: string): Promise<IExample>;
    create(data: IExampleWithoutId): Promise<IExample>;
}

export interface IExample2Service {
    testGet2(id: string): Promise<IExample>;
}

export interface IExample {
    id: string;
    value: string;
}

export type IExampleWithoutId = Omit<IExample, 'id'>;
