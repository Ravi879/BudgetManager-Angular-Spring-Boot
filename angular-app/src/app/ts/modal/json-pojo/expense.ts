import {jsonMember, jsonObject} from 'typedjson';

@jsonObject()
export class Expense {
  @jsonMember({constructor: Number})
  id: number;

  @jsonMember({constructor: String})
  description: string;

  @jsonMember({constructor: Number})
  value: number;

  percentage: number;

  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  calcPercentage(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  }

}
