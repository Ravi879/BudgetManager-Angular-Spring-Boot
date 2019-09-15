import {jsonMember, jsonObject} from 'typedjson';

@jsonObject()
export class Income {
  @jsonMember({constructor: Number})
  id:number;

  @jsonMember({constructor: String})
  description:string;

  @jsonMember({constructor: Number})
  value:number;

  constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  }

}
