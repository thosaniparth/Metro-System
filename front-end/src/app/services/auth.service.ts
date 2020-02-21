import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password:string)
  {
    return this.http.post<any>(`http://localhost:3000/user/login`,{ username, password }).pipe(map(user =>
      {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }

  register(username: string, password:string, contact:string, email:string)
  {
    return this.http.post<any>(`http://localhost:3000/user/register`,{ username, email, contact, password }).pipe(map(user =>
      {
        return user;
      }));
  }

  addBalance(walletBalance:number)
  {
    const user = localStorage.getItem('currentUser');
    const userJ = JSON.parse(user);
    const username = userJ.username;
    return this.http.post<any>(`http://localhost:3000/user/addBalance`,{ username, walletBalance }).pipe(map(user =>
      {
        return user;
      }));
  }

  viewProfile()
  {
    const user = localStorage.getItem('currentUser');
    const userJ = JSON.parse(user);
    const username = userJ.username;
    return this.http.get<any>(`http://localhost:3000/user/viewProfile?username=`+username).pipe(map(user =>
      {
        return user;
      }));
  }

  logout()
  {
    localStorage.removeItem('currentUser');
  }
}
