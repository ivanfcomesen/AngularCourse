import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';

import {Http, Response} from '@angular/http';
import {baseURL} from '../shared/baseURL';
import {ProcessHTTPMsgService} from './process-httpmsg.service';

import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class LeaderService {

   constructor(private http: Http,
        private processHTTPMsgService: ProcessHTTPMsgService) {}

    getLeaders(): Observable<Leader[]> {
        return this.http.get(baseURL + 'leaders')
            .map(res => {return this.processHTTPMsgService.extractData(res);})
              .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }

    getLeader(id: number): Observable<Leader> {
        return this.http.get(baseURL + 'leaders/' + id)
            .map(res => {return this.processHTTPMsgService.extractData(res);})
              .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }          

    getFeaturedLeader(): Observable<Leader> {

        return this.http.get(baseURL + 'leaders?featured=true')
            .map(res => {return this.processHTTPMsgService.extractData(res)[0];})
            .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }
}