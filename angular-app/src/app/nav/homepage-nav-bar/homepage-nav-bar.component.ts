import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage-nav-bar',
  templateUrl: './homepage-nav-bar.component.html',
  styleUrls: ['./homepage-nav-bar.component.css'],
})
export class HomepageNavBarComponent implements OnInit {

  toggleNavbar = false;

  ngOnInit() {
  }
  constructor() {}

}
