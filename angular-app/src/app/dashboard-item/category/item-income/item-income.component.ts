import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Income} from '../../../ts/modal/json-pojo/income';
import {ItemUIService} from 'src/app/ts/service/item-u-i.service';
import {ItemDBService} from '../../../ts/network/service/item-d-b.service';
import {ErrorHandlerService} from '../../../ts/service/error-handler.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-item-income',
  templateUrl: './item-income.component.html',
  styleUrls: ['./item-income.component.css']
})
export class ItemIncomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  isItemEditing = false;

  @Input() income: Income;
  isItemBtnsVisible = false;
  backColor = '#fff';

  @ViewChild('card')
  itemCard: ElementRef;

  constructor(private itemUIService: ItemUIService, private itemDBService: ItemDBService, private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit() {
    this.subscription = this.itemUIService.itemToggleObserver.subscribe(item => {


      if (!this.isItemEditing && (item.id == this.income.id && this.isItemBtnsVisible == false)) {
        this.isItemBtnsVisible = true;
      } else {
        this.isItemBtnsVisible = false;
      }

      if (this.isItemEditing == true && item.type == 'edit' && item.id != this.income.id) {
        this.disabledItemEditState();
      }

      if (this.isItemEditing == true && item.type == 'delete' && item.id != this.income.id) {
        this.isItemBtnsVisible = false;
      }

    }, error => {
      console.error( "Error occurred while loading income item for editing", error);
    });
  }

  editItem(event: any) {
    event.stopPropagation();
    if (this.isItemEditing == true) {
      return;
    }

    this.setItemEditState();
    this.itemUIService.setItemDetails('income', this.income.id, this.income.description, this.income.value);
    this.itemUIService.setItemToggle(this.income.id, 'edit');
  }

  deleteItem(event: any) {
    event.stopPropagation();
    if (this.isItemEditing == true) {
      return;
    }

    this.setItemEditState();
    this.itemUIService.setItemToggle(this.income.id, 'delete');

    this.itemDBService.deleteItemFromDB(this.income.id, 'income')
      .subscribe(data => {

        // delete item from ui
        this.itemUIService.deleteItem('income', this.income.id);

        }, error => {
        this.disabledItemEditState();

        this.errorHandlerService.resolve(error);
      });

  }

  toggleItemBtns() {
    this.itemUIService.setItemToggle(this.income.id, 'income');
  }

  private setItemEditState() {
    this.backColor = '#dfdfdf';
    this.isItemEditing = true;
  }

  private disabledItemEditState() {
    this.backColor = '#fff';
    this.isItemEditing = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
