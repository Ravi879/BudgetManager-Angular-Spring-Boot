import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IntroGuideService} from '../ts/service/intro-guide.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string;

  constructor(private router: Router, private introGuideService: IntroGuideService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state;
    if (state && state['userName']) {
      this.userName = state['userName'];
    }

  }

  ngOnInit() {
    if (this.userName) {
      this.introGuideService.showWelcomeGuide(this.userName);
    }
  }

}
