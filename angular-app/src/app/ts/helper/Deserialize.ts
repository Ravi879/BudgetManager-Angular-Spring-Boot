import {TypedJSON} from 'typedjson';
import {AllItems} from '../modal/json-pojo/Alltems';

export class Deserialize {

  static getAllItem(response):AllItems{
    const serializer = new TypedJSON(AllItems);
    const jsonData = JSON.stringify(response);
    return  serializer.parse(jsonData);
  }

}
