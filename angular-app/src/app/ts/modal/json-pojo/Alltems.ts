import {Income} from './income';
import {Expense} from './expense';
import {jsonArrayMember, jsonMember, jsonObject} from 'typedjson';

@jsonObject()
export class AllItems {

  @jsonArrayMember(Income)
  incomes: Array<Income>;

  @jsonArrayMember(Expense)
  expenses: Array<Expense>;

  @jsonMember({constructor: String})
  msg: string;
}
