import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Expense} from '../../../ts/modal/json-pojo/expense';
import {ItemUIService} from 'src/app/ts/service/item-u-i.service';
import {ItemDBService} from 'src/app/ts/network/service/item-d-b.service';
import {ErrorHandlerService} from '../../../ts/service/error-handler.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-item-expense',
  templateUrl: './item-expense.component.html',
  styleUrls: ['./item-expense.component.css']
})
export class ItemExpenseComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private isItemEditing: boolean;

  @Input() expense: Expense;
  isItemBtnsVisible = false;
  backColor = '#fff';

  constructor(private itemUIService: ItemUIService, private itemDBService: ItemDBService, private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit() {
    this.subscription = this.itemUIService.itemToggleObserver.subscribe(item => {

      if ( !this.isItemEditing &&  (item.id == this.expense.id && this.isItemBtnsVisible == false)) {
        this.isItemBtnsVisible = true;
      } else {
        this.isItemBtnsVisible = false;
      }

      if (this.isItemEditing == true && item.type == 'edit' && item.id != this.expense.id) {
        this.disabledItemEditState();
      }

      if (this.isItemEditing == true && item.type == 'delete' && item.id != this.expense.id) {
        this.isItemBtnsVisible = false;
      }

    }, error => {
      console.error("Error occurred while loading expense item for editing", error);
    });
  }

  editItem(event: any) {
    event.stopPropagation();
    if(this.isItemEditing == true){
      return;
    }

    this.setItemEditState();
    this.itemUIService.setItemDetails('expense', this.expense.id, this.expense.description, this.expense.value);
    this.itemUIService.setItemToggle(this.expense.id, 'edit');
  }

  deleteItem(event: any) {
    event.stopPropagation();
    if(this.isItemEditing == true){
      return;
    }

    this.setItemEditState();
    this.itemUIService.setItemToggle(this.expense.id, 'delete');

    this.itemDBService.deleteItemFromDB(this.expense.id, 'expense')
      .subscribe(data => {
        //console.log('Item expense deleted, item description = ', this.expense.description);

        // delete item from ui
        this.itemUIService.deleteItem('expense', this.expense.id);
      }, error => {
        this.disabledItemEditState();

        this.errorHandlerService.resolve(error);

      });
  }

  toggleItemBtns() {
    this.itemUIService.setItemToggle(this.expense.id, 'expense');
  }

  private  setItemEditState(){
    this.backColor = '#dfdfdf';
    this.isItemEditing = true;
  }

  private disabledItemEditState(){
    this.backColor = '#fff';
    this.isItemEditing = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
