import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _authUrl = 'http://localhost:5000/auth'
  _registerUrl = 'http://localhost:5000/register'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient) { }
  
  login(user): Observable<any> {
    return this.http.post<any>(this._authUrl, user, this.httpOptions).pipe(
      tap((token) => console.log('got token::',token))
    );
  }
  register(user): Observable<any> {
    //TODO add registration endpoint on server
    return this.http.post<any>(this._registerUrl, user, this.httpOptions).pipe(
      tap((resp) => console.log('got token::',resp))
    );
  }

  getAll(): Observable<any> {
    //TODO add registration endpoint on server
    return this.http.get<any>('http://localhost:5000/getAll').pipe(
      tap((resp) => console.log('got resp::',resp))
    );
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
