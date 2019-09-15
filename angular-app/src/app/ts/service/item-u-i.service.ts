import {Expense} from '../modal/json-pojo/expense';
import {Income} from '../modal/json-pojo/income';
import {Subject} from 'rxjs';
import {Item} from '../modal/Item';
import {Budget} from '../modal/Budget';

export class ItemUIService {
  private budget: Budget;

  budgetObserver = new Subject<object>();
  editItemObserver = new Subject<Item>();
  itemToggleObserver = new Subject<Item>();

  constructor() {
    this.resetBudgetData();
  }

  addItem(item: Item) {

    let newItem: any;

    if (item.type === 'expense') {
      newItem = new Expense(item.id, `${item.description}`, item.value);
    } else if (item.type === 'income') {
      newItem = new Income(item.id, item.description, item.value);
    } else {
      return;
    }

    this.budget.newItem(item.type, newItem);
    this.budgetObserver.next( this.getBudget() );
  }

  updateItem(updatedItem: Item){
    const index = this.budget.getItemIndex(updatedItem.type, updatedItem.id);
    if (index !== -1) {
      this.budget.updateItem(index, updatedItem);
      this.budgetObserver.next( this.getBudget() );
    }
  }

  deleteItem(type, id) {
    const index = this.budget.getItemIndex(type, id);
    if (index !== -1) {
      this.budget.deleteItem(type, index);
      this.budgetObserver.next( this.getBudget() );
    }
  }



  // ========  get the values  ========

  getIncomes() {
    return this.budget.getAllIncome();
  }
  getExpenses() {
    return this.budget.getAllExpense();
  }
  getBudget(): object {
    return this.budget.getTotalBudget();
  }


  loadItemsInUI(incomeList: Array<Income>, expenseList: Array<Expense>) {
    this.budget.setItems(incomeList, expenseList);
    this.budgetObserver.next( this.getBudget() );
  }

  setItemDetails(type: string, id: number, description: string, value: number) {
    this.editItemObserver.next( Item.setAll(id, value, description, type) );
  }

  setItemToggle(id: number, type: string){
    this.itemToggleObserver.next( Item.setIdAndType(id, type) )
  }

  resetBudgetData() {
    this.budget = new Budget();
  }


}
