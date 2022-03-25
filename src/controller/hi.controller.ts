import { Controller, Get, Logger } from '@nestjs/common';
import { Public } from 'src/module/auth/decorator/public.decorator';

@Controller('hi')
export class hiController {
    private readonly logger = new Logger('hiController');
    constructor(
    ) { }

    @Public()
    @Get('/')
    async testGet(): Promise<number> {
        return 0
    }
}
