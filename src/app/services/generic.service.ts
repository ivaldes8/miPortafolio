import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, timeout, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private http: HttpClient) { }

  getAboutMe() {
    return this.http.get(`${environment.API_URL}/Portafolio`).pipe(
      map(responseData => {
        return responseData;
      })
    ).toPromise()
  }
  timer(){
      setTimeout(function(){
        console.log("waited for: 5 seconds");
      }, 10000)
   
  }
}
