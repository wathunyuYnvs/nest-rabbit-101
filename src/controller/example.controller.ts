import { Body, Controller, Get, Inject, Logger, Post, Query } from '@nestjs/common';
import * as util from 'util';
import { ErrorException } from 'src/common/utils';
import { Public } from 'src/module/auth/decorator/public.decorator';
import { ExampleErrors } from 'src/module/example/example.error';
import { ExampleServiceProvider } from 'src/module/example/example.enum';
import { IExampleService } from 'src/module/example/example.interface';
import { ExampleDto } from 'src/module/example/dto/example.dto';
import { GetExampleDto } from 'src/module/example/dto/get.dto';

@Controller('example')
export class ExampleController {
    private readonly logger = new Logger('ExampleController');
    constructor(
        @Inject(ExampleServiceProvider.Example)
        private readonly exampleService: IExampleService
    ) {}

    @Public()
    @Get('/')
    async testGet(@Query() query: GetExampleDto): Promise<void> {
        this.logger.debug('Testing Get');
        this.logger.debug(
            `query => ${util.inspect(query, {
                colors: true,
                compact: false,
            })}`
        );
        this.exampleService.testGet('abcd');
        throw ErrorException(ExampleErrors.INVALID_ARGUMENT_EXCEPTION);
    }

    @Public()
    @Post('/')
    async testPost(@Body() data: ExampleDto): Promise<void> {
        this.exampleService.create(data);
        this.logger.debug('Testing Post');
    }
}
