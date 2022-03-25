import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ExampleServiceProvider } from './example.enum';
import { ExampleService } from './example.service';

@Module({
    imports: [],
    providers: [
        ExampleService,
        {
            provide: ExampleServiceProvider.Example,
            useExisting: ExampleService,
        },
        {
            provide: ExampleServiceProvider.Example2,
            useExisting: ExampleService,
        },
        PrismaService
    ],
    exports: [ExampleServiceProvider.Example],
})
export class ExampleModule {}
