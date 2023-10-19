import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }
  apiURL = 'https://apicv-service-dianabeja.cloud.okteto.net/';

  //Http options
  httpoptions={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  getTest1():Observable<any>{
    return this.http.get<any>(this.apiURL+'test1',this.httpoptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getTest2():Observable<any>{
    return this.http.get<any>(this.apiURL+'test2',this.httpoptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getTest3():Observable<any>{
    return this.http.get<any>(this.apiURL+'test3',this.httpoptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getTest4():Observable<any>{
    return this.http.get<any>(this.apiURL+'test4',this.httpoptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  handleError(error: any){
    let errorMessaje= '';
    if(error.error instanceof ErrorEvent){
      errorMessaje= error.error.messaje;
    }else {
      errorMessaje = `Error code: ${error.status}\n messaje: ${error.messaje}`
    }
    window.alert(errorMessaje);
    return throwError(errorMessaje);
  }
}
