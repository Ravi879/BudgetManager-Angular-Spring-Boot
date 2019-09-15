import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from 'src/app/ts/network/service/user.service';
import {ErrorHandlerService} from '../../ts/service/error-handler.service';

@Component({
  selector: 'app-dashboard-nav-bar',
  templateUrl: './dashboard-nav-bar.component.html',
  styleUrls: ['./dashboard-nav-bar.component.css']
})
export class DashboardNavBarComponent implements OnInit {

  toggleNavBar = false;

  constructor(private errorHandlerService: ErrorHandlerService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  logout() {

    this.userService.logOut().subscribe(
      logoutSuccess => {
        this.router.navigate(['/homepage']);
      },
      error => {
        this.errorHandlerService.resolve(error);
      }
    );

  }

}
