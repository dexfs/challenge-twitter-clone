import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityValidationError } from '#core/@shared';
import DomainError from '#core/@shared/errors/domain-error';

@Catch(EntityValidationError, DomainError)
export class CoreExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus;
    let errorMessage: string | string[];

    if (exception instanceof EntityValidationError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      errorMessage = Object.values(exception.error).flat();
    } else if (exception instanceof DomainError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      errorMessage = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Internal server error';
    }

    response.status(status).json({
      errors: errorMessage,
    });
  }
}
