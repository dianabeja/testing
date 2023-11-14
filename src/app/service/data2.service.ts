import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService2 {

  constructor(private http: HttpClient) { }
  apiURL = 'https://apicv-service-dianabeja.cloud.okteto.net/hours';

  //Http options
  httpoptions={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  gethours():Observable<any>{
    return this.http.get<any>(this.apiURL,this.httpoptions)
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
