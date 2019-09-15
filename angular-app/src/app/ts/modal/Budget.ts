import {Expense} from './json-pojo/expense';
import {Income} from './json-pojo/income';
import {Item} from './Item';

export class Budget {
  private allItems = {
    expense: Array<Expense>(),
    income: Array<Income>()
  };

  private total = {
    income: 0,
    expense: 0,
    budget: 0,
    percentage: -1
  };

  constructor() {
  }

  setItems(incomeList: Array<Income>, expenseList: Array<Expense>){
    this.allItems.income.push(...incomeList);
    this.allItems.expense.push(...expenseList);

    this.calculateBudget();
  }


  newItem(type: string, item: any){
    this.allItems[type].push(item);

    this.calculateBudget();
  }

  updateItem(index: number, updatedItem: Item){
    const item = this.allItems[updatedItem.type][index];
    item['description'] = updatedItem.description;
    item['value'] = updatedItem.value;

    this.calculateBudget();
  }

  deleteItem(type:string, index: number){
    this.allItems[type].splice(index, 1);

    this.calculateBudget();
  }

  getItemIndex(type: string, id: number){
    const aryId = this.allItems[type].map(item => item.id);
    return aryId.indexOf(id);
  }
  getAllIncome(){
    return this.allItems.income;
  }
  getAllExpense(){
    return this.allItems.expense;
  }
  getTotalBudget(){
    return this.total;
  }

  private calculateBudget() {
    // calculate the total income and expanse
    this.calculateItemTotal('expense');
    this.calculateItemTotal('income');

    // calculate budget
    this.total.budget = this.total.income - this.total.expense;

    // calculate the percentage of income that we spent
    if (this.total.income > 0) {
      this.total.percentage = Math.round(
        (this.total.expense / this.total.income) * 100
      );
    } else {
      this.total.percentage = -1;
    }

    // calculate individual expense percentage
    this.calculateExpensePercentage();
  }

  private calculateExpensePercentage() {
    const totalIncome = this.total.income;
    this.allItems.expense.forEach(cur => {
      cur.calcPercentage(totalIncome);
    });
  }

  private calculateItemTotal(type: string) {
    let sum = 0;
    this.allItems[type].forEach(cur => {
      sum = sum + cur.value;
    });
    this.total[type] = sum;
  }

}
