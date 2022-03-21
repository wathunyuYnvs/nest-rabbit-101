import { HttpException, HttpStatus } from '@nestjs/common';
import { get as getHttpContext } from 'express-http-context';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { EExceptionType } from 'src/common/enum';
import { IError } from 'src/common/interface';

/**
 * build in function for binding custom error exception.
 *
 * @method
 * @param {string} {errorCode} - An error code that has been implemented in scr/constance/error.
 * @param {EExceptionType} {exceptionType} - An exception type for error behavior.
 * @example
 * throw ErrorException(Errors.EX001); // default declared EExceptionType param as EExceptionType.HTTP
 * throw ErrorException(Errors.EX001, EExceptionType.INTERNAL) // to throw system error
 */
export const ErrorException = (
    error: IError,
    exceptionType: EExceptionType = EExceptionType.HTTP
): HttpException => {
    const errorMessage = error.message;
    const errorCode = error.code;
    const requestId = getHttpContext('requestid');
    switch (exceptionType) {
        case EExceptionType.HTTP:
            return new HttpException(
                {
                    requestId: requestId,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: getReasonPhrase(StatusCodes.BAD_REQUEST),
                    error: {
                        code: `${errorCode}`,
                        message: `Operation failed (${errorMessage})`,
                    },
                },
                HttpStatus.BAD_REQUEST
            );
        case EExceptionType.INTERNAL:
            throw new Error(`code :: ${errorCode} | message :: ${errorMessage} |`);
        default:
            break;
    }
};
