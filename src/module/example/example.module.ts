import { Module } from '@nestjs/common';
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
    ],
    exports: [ExampleServiceProvider.Example],
})
export class ExampleModule {}
