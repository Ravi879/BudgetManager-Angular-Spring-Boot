import {HttpErrorResponse} from '@angular/common/http';
import {ErrorDialogService} from './errordialog.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor(private errorDialogService: ErrorDialogService) {
  }

  public resolve(error){
    if (error instanceof HttpErrorResponse) {
      // default error dialog is shown from http interceptor, because http error occurred, so simply return from  here.
      return;
    }

    console.error("Error occurred, - ", error);

    const data = {
      msg: error.toString()
    };
    this.errorDialogService.openDialog(data);
  }

}
