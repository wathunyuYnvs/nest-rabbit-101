import { IError } from 'src/common/interface';

export class ExampleErrors {
    private static readonly domain = 'ExampleErrors';
    public static readonly INVALID_ARGUMENT_EXCEPTION: IError = {
        code: `${this.domain}:0001`,
        message: 'invalid argument',
    };
}
