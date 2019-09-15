import {Component, OnInit} from '@angular/core';
import {ItemUIService} from '../../ts/service/item-u-i.service';
import {ItemDBService} from '../../ts/network/service/item-d-b.service';
import {ErrorHandlerService} from '../../ts/service/error-handler.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalOption} from 'src/app/ts/helper/ModalOption';
import {ModalLoadingComponent} from '../../modal/modal-loading/modal-loading.component';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  loadingDialogRef: BsModalRef = null;

  constructor(private modelService: BsModalService, private errorHandlerService: ErrorHandlerService, private itemUIService: ItemUIService,
              private itemDBService: ItemDBService) {
  }

  ngOnInit() {
    this.itemUIService.resetBudgetData();
    this.getAllItem();
  }

  getIncomeList() {
    return this.itemUIService.getIncomes();
  }

  getExpenseList() {
    return this.itemUIService.getExpenses();
  }

  private getAllItem() {

    this.openLoadingDialog();

    this.itemDBService.getAllItem().subscribe(allItems => {

      this.itemUIService.loadItemsInUI(allItems.incomes, allItems.expenses);
      this.closeLoadingDialog();

    }, error => {
      this.closeLoadingDialog();
      this.errorHandlerService.resolve(error);

    });
  }

  private openLoadingDialog() {
    const options = ModalOption.getOptions(null, true, true);
    this.loadingDialogRef = this.modelService.show(ModalLoadingComponent, options);
  }

  private closeLoadingDialog() {

    setTimeout(() => {
      if (this.loadingDialogRef != null) {
        this.loadingDialogRef.hide();
        this.loadingDialogRef = null;
      }
    }, 2000);

  }
}
