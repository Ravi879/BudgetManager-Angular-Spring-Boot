import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemUIService} from '../ts/service/item-u-i.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-header-section',
  templateUrl: './dashboard-header-section.html',
  styleUrls: ['./dashboard-header-section.css']
})
export class  DashboardHeaderSection implements OnInit, OnDestroy {

  private subscription: Subscription;
  private itemUIService: ItemUIService;

  budget: number = 0.00;
  totalInc: number = 0.00;
  totalExp: number = 0.00;
  expensePercentage: number = 0;

  constructor(itemUIService: ItemUIService) {
    this.itemUIService = itemUIService;
   }

  ngOnInit() {
    this.subscription = this.itemUIService.budgetObserver.subscribe(data => {
      this.updateBudget(data);
    });
  }

  updateBudget(data){
    this.budget = data["budget"];
    this.totalInc = data["income"];
    this.totalExp = data["expense"];
    this.expensePercentage = data["percentage"];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
