import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shared } from './shared';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  getTickets():Observable<any>{
    return this.http.get(shared.url+'tickets/all')
  }

  getTypes(): Observable<any> {
    return this.http.get(shared.url + 'ticketypes')
  }
  updateType(type: any): Observable<any> {
    /* let params= JSON.stringify(department) */
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(shared.url + 'ticketypes/' + type.id, type, { headers: headers })
  }

  deleteType(id: any): Observable<any> {
    return this.http.delete(shared.url + 'ticketypes/' + id)
  }
  saveType(type: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(shared.url + 'ticketypes', type, { headers: headers })
  }

  getCategories(): Observable<any> {
    return this.http.get(shared.url + 'categories')
  }
  updateCategory(type: any): Observable<any> {
    /* let params= JSON.stringify(department) */
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(shared.url + 'categories/' + type.id, type, { headers: headers })
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete(shared.url + 'categories/' + id)
  }
  saveCategory(type: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(shared.url + 'categories', type, { headers: headers })
  }


}
