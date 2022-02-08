import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shared } from './shared';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient) { }

  getMarks(): Observable<any> {
    return this.http.get(shared.url + 'marks')
  }

 
  

  updateMark(mark: any): Observable<any> {
    /* let params= JSON.stringify(department) */
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(shared.url + 'marks/' + mark.id, mark, { headers: headers })
  }

  deleteMark(id: any): Observable<any> {
    return this.http.delete(shared.url + 'marks/' + id)
  }
  saveMark(mark: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(shared.url + 'marks', mark, { headers: headers })
  }

  getEquipmentTypes(): Observable<any> {
    return this.http.get(shared.url + 'equipmentypes')
  }
  updateEquipmentType(equipmentype: any): Observable<any> {
    /* let params= JSON.stringify(department) */
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(shared.url + 'equipmentypes/' + equipmentype.id, equipmentype, { headers: headers })
  }

  deleteEquipmentType(id: any): Observable<any> {
    return this.http.delete(shared.url + 'equipmentypes/' + id)
  }
  saveEquipmentType(equipmentype: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(shared.url + 'equipmentypes', equipmentype, { headers: headers })
  }

  getEquipmentModels(): Observable<any> {
    return this.http.get(shared.url + 'models')
  }
  updateEquipmentModel(equipmenmodel: any): Observable<any> {
    /* let params= JSON.stringify(department) */
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(shared.url + 'models/' + equipmenmodel.id, equipmenmodel, { headers: headers })
  }

  deleteEquipmentModel(id: any): Observable<any> {
    return this.http.delete(shared.url + 'models/' + id)
  }
  saveEquipmentModel(equipmenmodel: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(shared.url + 'models', equipmenmodel, { headers: headers })
  }
  getDevices(): Observable<any> {
    return this.http.get(shared.url + 'itequipments')
  }
  updateDevice(device: any): Observable<any> {
    /* let params= JSON.stringify(department) */
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(shared.url + 'itequipments/' + device.inventory_cod, device, { headers: headers })
  }

  deleteDevice(id: any): Observable<any> {
    return this.http.delete(shared.url + 'itequipments/' + id)
  }
  saveDevice(device: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(shared.url + 'itequipments', device, { headers: headers })
  }


  /* users device */
  getUserDevice(): Observable<any> {
    return this.http.get(shared.url + 'assignments')
  }
  updateUserDevice(device: any): Observable<any> {
    /* let params= JSON.stringify(department) */
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(shared.url + 'assignments/' + device.inventory_cod, device, { headers: headers })
  }

  deleteUserDevice(id: any): Observable<any> {
    return this.http.delete(shared.url + 'assignments/' + id)
  }
  saveUserDevice(device: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(shared.url + 'assignments', device, { headers: headers })
  }
  /* end user devices */
}
