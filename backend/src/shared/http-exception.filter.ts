import { Catch, ExceptionFilter, HttpException, HttpStatus, ArgumentsHost } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(userAlreadyExists: string, BAD_REQUEST: HttpStatus) {}

    catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const errorResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: status !== HttpStatus.INTERNAL_SERVER_ERROR ? exception.message.error || exception.message || null : 'Internal Server Error',
        };
    }
}
