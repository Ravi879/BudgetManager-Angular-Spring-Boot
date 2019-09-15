import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {Api} from '../../helper/Api';
import {mergeMap} from 'rxjs/operators';
import {AllItems} from '../../modal/json-pojo/Alltems';
import {Deserialize} from '../../helper/Deserialize';


@Injectable()
export class ItemDBService {

  constructor(private httpClient: HttpClient) {
  }


  saveItem(itemId: number, {type, description, value}): Observable<any> {


    let api = type === 'income' ? Api.saveIncomeItem : Api.saveExpenseItem;
    api = api.replace('%id%', itemId.toString());

    const item = {
      description,
      value
    };

    return this.httpClient.put(api, item).pipe(
      mergeMap(data => {
        console.log("save item ",  type ,", response = ", data);

        if (data['msg']) {
          const msg = data['msg'];
          return throwError(msg);
        } else {
          return of(data['item']['id']);
        }

      })
    );
  }

  deleteItemFromDB(id: number, type: string): Observable<object> {
    let api = type === 'income' ? Api.deleteIncomeItem : Api.deleteExpenseItem;
    api = api.replace('%id%', id.toString());

    return this.httpClient.delete(api).pipe(
      mergeMap(data => {
        console.log("delete item ", type ,", response =", data);

        if (data['msg']) {
          const msg = data['msg'];
          return throwError(msg);
        } else {
          return of(data);
        }

      })
    );
  }

  getAllItem(): Observable<AllItems> {
    return this.httpClient.get(Api.getAllItem)
      .pipe(mergeMap(data => {
          console.log('getting all item, response = ', data);

          if (data['msg']) {
            const msg = data['msg'];
            return throwError(msg);
          } else {
            const allItems: AllItems = Deserialize.getAllItem(data);
            return of(allItems);
          }

        })
      );

  }

}
