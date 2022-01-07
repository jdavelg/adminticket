import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  getTickets():Observable<any>{
    return this.http.get('')
  }
}
