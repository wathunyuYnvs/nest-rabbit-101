import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
    IExample,
    IExample2Service,
    IExampleService,
    IExampleWithoutId,
} from './example.interface';

@Injectable()
export class ExampleService implements IExampleService, IExample2Service {
    private readonly logger = new Logger('ExampleService');

    constructor(
        private readonly prismaSrvice: PrismaService
    ) { }

    async testGet(id: string): Promise<IExample> {
        this.logger.verbose('Getting testGet');
        const example: IExample = {
            id: id,
            value: '',
        };
        return example;
    }

    async create(data: IExampleWithoutId): Promise<IExample> {
        const example: IExample = {
            id: 'generatedId',
            value: data.value,
        };
        return example;
    }

    async testGet2(id: string): Promise<IExample> {
        this.logger.verbose('Getting testGet2');
        const example: IExample = {
            id: id,
            value: '',
        };
        return example;
    }
}
