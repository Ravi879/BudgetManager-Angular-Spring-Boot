import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemUIService} from '../../ts/service/item-u-i.service';
import {ItemDBService} from '../../ts/network/service/item-d-b.service';
import {Item} from '../../ts/modal/Item';
import {ErrorHandlerService} from '../../ts/service/error-handler.service';
import {Subscription} from 'rxjs';
import {Msg} from '../../ts/helper/Msg';
import {IntroGuideService} from '../../ts/service/intro-guide.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  currentItem: Item = Item.setAll(-1, null, '', '');
  isEditItem = false;
  isFormSubmitted = false;

  previousDescription: string;
  previousValue: number;

  itemOptions = [
    {display: 'None', value: ''},
    {display: 'Income', value: 'income'},
    {display: 'Expense', value: 'expense'},
  ];

  constructor(private itemUIService: ItemUIService, private dbService: ItemDBService, private errorHandlerService: ErrorHandlerService,
              private introGuideService: IntroGuideService) {
  }

  ngOnInit() {
    this.subscription = this.itemUIService.editItemObserver.subscribe(item => {
      this.currentItem = Item.setAll(item.id, item.value, item.description, item.type);

      this.previousDescription = item.description;
      this.previousValue = item.value;

      this.isEditItem = item.id > 0;

      window.scroll({left: 0, top: 0, behavior: 'smooth'});
    });
  }

  onSubmit(formSubmitted: any) {

    if (formSubmitted.form.invalid) {
      return;
    }

    const item: Item = this.getItem(formSubmitted);
    let itemId: number;

    if (this.isEditItem && this.isItemDescriptionOrValueChanged() == false) {
      this.errorHandlerService.resolve(Msg.itemNotEdited);
      return;
    } else if (this.isEditItem) {
      itemId = this.currentItem.id;
    } else {
      itemId = -1;
    }

    this.showLoading();

    this.dbService.saveItem(itemId, item).subscribe(responseItem => {
      console.log('Item ', item.type, ' stored or updated, item description = ', item.description);

      item.id = responseItem['itemId'];

      if (itemId > 0) {
        //update item to list
        this.itemUIService.updateItem(item);
      } else {
        // add item to list
        this.itemUIService.addItem(item);

        if(responseItem["isFirstItem"]){
          this.introGuideService.showItemEditGuide(item.type + '_' + item.id);
        }

      }

      this.resetForm(formSubmitted);

      this.hideLoading();
    }, error => {
      this.hideLoading();

      this.errorHandlerService.resolve(error);
    });

  }

  resetForm(formSubmitted) {
    formSubmitted.form.markAsPristine();
    formSubmitted.resetForm();

    this.resetUserItem();
    this.toggleItemBackground();
  }

  private getItem(formSubmitted) {
    const item = new Item();

    item.type = this.isEditItem ? this.currentItem.type : formSubmitted.value.type;
    item.description = formSubmitted.value.description;
    item.value = parseFloat(formSubmitted.value.amount);

    return item;
  }

  private isItemDescriptionOrValueChanged(): boolean {
    return this.currentItem.description != this.previousDescription || this.currentItem.value != this.previousValue;
  }

  private resetUserItem() {
    this.currentItem.type = '';
    this.currentItem.id = -1;
    this.isEditItem = false;
  }


  private toggleItemBackground() {
    this.itemUIService.setItemToggle(-1, 'edit');
  }

  private showLoading() {
    this.isFormSubmitted = true;
  }

  private hideLoading() {
    this.isFormSubmitted = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
