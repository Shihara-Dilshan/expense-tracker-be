import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Custom exception filter to handle HTTP exceptions globally.
 * This filter catches all exceptions of type `HttpException` and
 * formats the response in a consistent structure.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    /**
     * Handles the caught exception and formats the response.
     * @param exception The caught `HttpException`.
     * @param host Provides details about the execution context.
     */
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<FastifyRequest>();
        const response = ctx.getResponse<FastifyReply>();

        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as
            | string
            | { message: string | string[] };

        response.status(status).send({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.raw.url,
            message:
                typeof exceptionResponse === 'string'
                    ? exceptionResponse
                    : exceptionResponse['message'],
        });
    }
}
