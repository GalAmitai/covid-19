import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';
import { CovidItem } from '../_models/covid-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  MAX_SIZE: number = 5;
  date = '2020-06-04'; // Date with DATA !!!!

  constructor(
    private http: HttpClient
  ) { }

  getPopulars(): Observable<any> {
    
    ///
    /// All countries endpoint was disabled to my subscription so it will be ugly :(
    /// Free subscription also returns alot of "Too many requests"... :(
    /// So need to send each endpoint with delay at least 1 second.
    ///

    const IL = this.http.get(environment.rapid_host + '/country/code', { params: { code: 'IL', date: this.date } });
    const IT = this.http.get(environment.rapid_host + '/country/code', { params: { code: 'IT', date: this.date } });
    const IN = this.http.get(environment.rapid_host + '/country/code', {params: { code: 'IN', date: this.date }});
    const NL = this.http.get(environment.rapid_host + '/country/code', {params: { code: 'NL', date: this.date }});
    const RU = this.http.get(environment.rapid_host + '/country/code', {params: { code: 'RU', date: this.date }});

    return new Observable(subscriber => {
      setTimeout(() => subscriber.next(IL) , 0);
      setTimeout(() => subscriber.next(IT) , 1000);
      setTimeout(() => subscriber.next(IN) , 2200);
      setTimeout(() => subscriber.next(NL) , 3400);
      setTimeout(() => subscriber.next(RU) , 4600);
      setTimeout(() => subscriber.next(of('end')) , 5000);
      setTimeout(() => subscriber.complete() , 6000);
    });

    /// All this bad code shoud be replaced by Forkjoin but as i said we will get "Too many requests".

  }


  getDataByCountry(text: string) {
    return this.http.get(environment.rapid_host + '/report/country/name', { params: { name: text , date: this.date } });
  }

  getStatusByDateAndCountry(date: string, code: string) {
    return this.http.get(environment.rapid_host + '/report/country/code', { params: { code: code , date } });
  }
}
