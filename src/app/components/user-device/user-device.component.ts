import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Userdevice } from 'src/app/interfaces/userdevice';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-user-device',
  templateUrl: './user-device.component.html',
  styleUrls: ['./user-device.component.css']
})
export class UserDeviceComponent implements OnInit {

  devices: Userdevice[]
  device: Userdevice
  clonedUserDevices: { [s: string]: Userdevice; } = {};

  deviceDialog: boolean;

  today = new Date()

  selectedUserDevices: Userdevice[];

  submitted: boolean;

  statuses: any[];
  marks: any[]
  models: any[]
  equipmentTypes: any[]
  constructor(private _deviceService: DevicesService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {

    this.getMarks()
    this.getModels()
    this.getTypes()
    this.getUserDevices()
  }

  getMarks() {
    this._deviceService.getMarks().subscribe(
      resp => {
        this.marks = resp
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )
  }
  getTypes() {

    this._deviceService.getEquipmentTypes().subscribe(
      resp => {
        this.equipmentTypes = resp
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });

      }
    )
  }
  getModels() {
    this._deviceService.getEquipmentModels().subscribe(
      resp => {
        this.models = resp
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )

  }
  getUserDevices() {
    this._deviceService.getUserDevice().subscribe(
      resp => {
       resp.forEach((device:any)=>{
         device.date_purchase= new Date(device.date_purchase)

        device['fecha']=new Date(device.date_purchase).toISOString().split('T')[0] 
       })
        this.devices = resp
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )
  }
  /* new code  */
  openNew() {
    this.device = {}
    this.submitted = false;
    this.deviceDialog = true;
  }

  deleteSelectedUserDevices() {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar este device?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        for (var i = 0; i < this.selectedUserDevices.length; i++) {
          let device = this.selectedUserDevices[i]
          this._deviceService.deleteUserDevice(device.inventory_cod).subscribe(
            resp => {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'borrado ' + i + ' de ' + this.selectedUserDevices.length + ' seleccionados', life: 1000 });

            },
            err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ' + i + ' de ' + this.selectedUserDevices.length + ' seleccionados', life: 1000 });
            }
          )
        }
        this.selectedUserDevices = [];
        this.getUserDevices()
      }
    });
  }

  editUserDevice(device: Userdevice) {
    this.device = { ...device };
    this.deviceDialog = true;
  }

  deleteUserDevice(device: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro sobre eliminar este equipo ' + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*       this.types = this.types.filter(val => val.id !== type.id); */
        this._deviceService.deleteUserDevice(device.inventory_cod).subscribe(
          resp => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro borrado satisfactoriamenete', life: 3000 });
            this.getUserDevices()
          },
          err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ', life: 3000 });
          }
        )
        this.device = {};

      }
    });
  }

  hideDialog() {
    this.device = {}
    this.deviceDialog = false;
    this.submitted = false;
  }

  saveUserDevice() {
    this.submitted = true;
    console.log(this.device);

    if (this.device.inventory_cod !== undefined && this.device.inventory_cod
      != null) {
      if (this.device.created_at) {
        delete this.device.created_at
      }
      if (this.device.updated_at) {
        delete this.device.updated_at
      }
     let dateToChange= new Date(this.device.date_purchase).toISOString().split('T')[0] 
   this.device.date_purchase= dateToChange  
      console.log(this.device.date_purchase);
      delete this.device.fecha
      this._deviceService.updateUserDevice(this.device).subscribe(
        resp => {
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getUserDevices()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
          this.hideDialog()
        }
      )
    } else {
      this._deviceService.saveUserDevice(this.device).subscribe(
        resp => {
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getUserDevices()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
          this.hideDialog()
        }
      )
    }

    /*    if (this.type.name) {
           if (this.product.id) {
               this.products[this.findIndexById(this.product.id)] = this.product;
               this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
           }
           else {
               this.product.id = this.createId();
               this.product.image = 'product-placeholder.svg';
               this.products.push(this.product);
               this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
           }
   
           this.types = [...this.types];
           this.typeDialog = false;
           this.type = undefined;
       } */


  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].inventory_cod === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  /* end new code */


}
