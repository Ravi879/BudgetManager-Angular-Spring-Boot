import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../modal/user';
import {Api} from '../../helper/Api';
import {Observable, of, throwError} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Msg} from '../../helper/Msg';


@Injectable()
export class UserService {

  IS_LOGGED_IN = 'isUserLoggedIn';

  constructor(private httpClient: HttpClient) {
  }

  registerNewUser(user: User): Observable<any> {
    return this.httpClient.post(Api.signUpUrl, user)
      .pipe(mergeMap(data => {
          console.log("registering new user, response = ", data);

          if (data['success'] === true) {
            return of(Msg.signUpSuccessMsg);
          } else {
            const msg = data['msg'];
            return throwError(msg);
          }
        })
      );
  }

  loginUser(username: string, password: string): Observable<any> {
    const user = {
      'email': username,
      'password': password
    };

    return this.httpClient.post(Api.loginUrl, user)
      .pipe(mergeMap(data => {
          console.log('login user, response = ', data);

          if (data['success'] === true) {
            this.setUserInLocalStorage();

            return of(Msg.loginSuccessMsg);
          } else {
            const msg = data['msg'];
            return throwError(msg);
          }
        })
      );
  }

  logOut() {

    return this.httpClient.post(Api.logoutUrl, null)
      .pipe(mergeMap(data => {
          console.log('logout user, response = ', data);

          if (data['success'] === true) {

            this.deleteUserFromLocalStorage();

            return of(Msg.logoutSuccessful);

          } else {
            const msg = data['msg'] ? data['msg'] : Msg.logoutFailed;
            return throwError(msg);
          }

        })
      );
  }

  //====================================

  isUserLoggedIn(): boolean {
    // console.log('Is use logged in, in local storage ', localStorage.getItem(this.IS_LOGGED_IN), " is stored.");
    return localStorage.getItem(this.IS_LOGGED_IN) == 'true';

  }

  deleteUserFromLocalStorage() {
    localStorage.removeItem('isUserLoggedIn');
  }

  private setUserInLocalStorage() {
    localStorage.setItem('isUserLoggedIn', 'true');

  }

}
