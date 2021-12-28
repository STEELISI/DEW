import { ErrorHandler } from '@angular/core';
import { LogService, LogHeader } from './experiment/hlbparser/common/logging-service';

export class ErrorInterceptor extends LogService implements ErrorHandler {

  handleError(error) {
    console.log(error);
    this.log(LogHeader.ERROR, error.stack);
  }
}