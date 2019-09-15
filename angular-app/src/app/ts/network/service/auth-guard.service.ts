import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const path = router.url[0].path;

    if (path == 'dashboard') {
      console.log('is user logged in = ', this.userService.isUserLoggedIn());
      if (this.userService.isUserLoggedIn() == true) {
        return true;
      }

      this.router.navigate(['homepage']);
      return false;

    } else if (path == 'homepage') {

      //if user is not logged in than only show homepage
      if (this.userService.isUserLoggedIn() == false) {
        return true;
      }
      //else navigate to dashboard page.
      else{
        this.router.navigate(['dashboard']);
        return false;
      }

    }

  }

}
