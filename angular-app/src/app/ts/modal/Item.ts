export class Item {

  id: number;
  value: number;
  description: string;
  type: string;

  constructor() {
  }

  static setAll(id: number, value: number, description: string, type: string){
    const item = new Item();
    item.id = id;
    item.value = value;
    item.description = description;
    item.type = type;

    return item;
  }

  static setIdAndType(id: number, type: string){
    const item = new Item();
    item.id = id;
    item.type = type;

    return item;
  }

}
