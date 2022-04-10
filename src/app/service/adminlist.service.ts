import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { admin } from 'src/app/models/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminlistService {

  private baseUrl:string = environment.baseUrl; 
  constructor(private http:HttpClient){ }

  getListProvider():Observable<admin[]> {
    const url = `${this.baseUrl}administrators/type=2/status=1`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<admin[]>(url, { headers: reqHeader });
  }
  getInactiveListProvider():Observable<admin[]> {
    const url = `${this.baseUrl}administrators/type=2/status=0`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<admin[]>(url, { headers: reqHeader });
  }

  getListAdminSys():Observable<admin[]> {
    const url = `${this.baseUrl}administrators/type=1/status=1`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<admin[]>(url, { headers: reqHeader });
    
  }
  getInactiveListAdminSys():Observable<admin[]> {
    const url = `${this.baseUrl}administrators/type=1/status=0`;
    let jwt= localStorage.getItem('token')
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
    console.log(url);
    return this.http.get<admin[]>(url, { headers: reqHeader });
    
  }
}
