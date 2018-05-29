import {Injectable} from '@angular/core';
import {Dish} from '../shared/dish';
import {Http, Response} from '@angular/http';
import {baseURL} from '../shared/baseURL';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/catch';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';


@Injectable()
export class DishService {
    
    
  constructor(private restangular: Restangular,
      private processHTTPMsg: ProcessHTTPMsgService,private http:Http) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
        .map(res => {return this.processHTTPMsg.extractData(res); })
                    .catch(error => { return this.processHTTPMsg.handleError(error); });
  }

  getDish(id: number): Observable<Dish> {
    return  this.http.get(baseURL + 'dishes/'+ id)
                    .map(res => { return this.processHTTPMsg.extractData(res); })
                    .catch(error => { return this.processHTTPMsg.handleError(error); });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
                    .map(res => { return this.processHTTPMsg.extractData(res)[0]; })
                    .catch(error => { return this.processHTTPMsg.handleError(error); });
  }

  getDishIds() : Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id ); })
        .catch(error => { return Observable.of(error); });//(error=>{return error;});(error => { return Observable.of(error); });
  }
}