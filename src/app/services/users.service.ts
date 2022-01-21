import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shared } from './shared';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient,) { }

  getUsers(): Observable<any> {
    return this.http.get(shared.url + 'employees/all/')
  }
  updateUser(user: any): Observable<any> {
    /*  let params= JSON.stringify(user) */
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(shared.url + 'employees/' + user.id, user, { headers: headers })
  }

  getDepartments(): Observable<any> {
    return this.http.get(shared.url + 'departments')
  }
  updateDepartment(department: any): Observable<any> {
    /* let params= JSON.stringify(department) */
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(shared.url + 'departments/' + department.id, department, { headers: headers })
  }

  deleteDepartment(id: any): Observable<any> {
    return this.http.delete(shared.url + 'departments/' + id)
  }
  saveDepartment(department: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(shared.url + 'departments', department, { headers: headers })
  }
}


