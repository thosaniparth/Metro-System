import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  addRoute(a: string, b:string, price:string)
  {
    return this.http.post<any>(`http://localhost:3000/route/addRoute`,{ a, b, price }).pipe(map(res=>
      {
        return res;
      }));
  }

  viewRoutes()
  {
    return this.http.get<any>(`http://localhost:3000/route/viewRoutes`).pipe(map(routes=>
    {
      return routes;
    }));
  }
}
