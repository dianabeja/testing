import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  apiURL = 'https://apicv-service-dianabeja.cloud.okteto.net/size';

  //Http options
  httpoptions={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  getSize():Observable<any>{
    return this.http.get<any>(this.apiURL,this.httpoptions)

  }

}
