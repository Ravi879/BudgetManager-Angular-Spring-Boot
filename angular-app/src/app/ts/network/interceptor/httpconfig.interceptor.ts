import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorDialogService} from '../../service/errordialog.service';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(public errorDialogService: ErrorDialogService, private router: Router, private userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let req;
    req = request.clone({
      withCredentials: true
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        let reason;
        const status = error.status;

        if (error.error instanceof Error) {
          // A client-side or network error occurred
          reason = 'An error occurred:' + error.error.message;
          this.errorDialogService.openDialog({reason, status}, false);

          console.error('An error occurred:', error.error.message, ' - ', error);
        } else {
          console.error(`Backend returned code ${error.status}`, ' - ', error);

          if (error.status == 401) {

            if (this.userService.isUserLoggedIn()) {
              reason = 'Session expired, please log in again.';
            } else {
              reason = 'Access denied, please first log in.';
            }

            this.userService.deleteUserFromLocalStorage();

            this.router.navigate(['homepage']);

            const data = {
              msg: reason
            };

            this.errorDialogService.openDialog(data);

          } else {
            reason = 'Server error occurred: ' + error.statusText; // error.error.error.message; //  error.statusText
            this.errorDialogService.openDialog({reason, status}, false);
          }

        }

        //return the error on the upper level:
        return throwError(error);
      })
    );

  }
}
