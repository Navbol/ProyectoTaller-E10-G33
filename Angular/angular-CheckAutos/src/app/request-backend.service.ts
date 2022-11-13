import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, Observable , pipe, retry, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestBackendService {
  url = 'http://[::1]:3000/';

  constructor(private http:HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getData(entity: string): Observable<any> {
    return this.http
    .get(this.url + entity)
    .pipe(retry(1), catchError(this.handleError));
  }

  getDataID(entity: string, id: any): Observable<any> {
    return this.http
      .get(this.url + entity + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  getTable1AndTable2(entity1: string,entity2: string) {
    return forkJoin(
      this.http.get(this.url + entity1),
      this.http.get(this.url + entity2)
    );
  }
 
  parallelRequests(entity1: string,entity2: string) {
    const parallel$ = forkJoin(
      this.http.get(this.url + entity1),
      this.http.get(this.url + entity2)
    );

    parallel$.subscribe(
      values => {
          console.log("all values", values)
      }
    );    
  }


  postData(entity: string, datos: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const httpOptions = {
      headers,
    };

    return this.http.post(this.url + entity, datos, httpOptions);
  }

  deleteData(entity: string, code: string): Observable<any> {
    return this.http.delete(this.url + entity + '/' + code);
  }

  updateData(entity: string, code: string, datos: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const httpOptions = {
      headers,
    };

    return this.http.put(this.url + entity + '/' + code, datos, httpOptions);
  }  

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
