import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Device } from 'src/app/interfaces/Device';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [MessageService, ConfirmationService],
  styles: [`
        :host ::ng-deep .p-dialog  {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
})
export class DevicesComponent implements OnInit {
  devices: Device[]
  device: Device
  clonedDevices: { [s: string]: Device; } = {};

  deviceDialog: boolean;

  today = new Date()

  selectedDevices: Device[];

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
    this.getDevices()
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
  getDevices() {
    this._deviceService.getDevices().subscribe(
      resp => {
        resp.forEach((device: any) => {
          device.date_purchase = new Date(device.date_purchase)

          device['fecha'] = new Date(device.date_purchase).toISOString().split('T')[0]
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

  deleteSelectedDevices() {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar este device?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        for (var i = 0; i < this.selectedDevices.length; i++) {
          let device = this.selectedDevices[i]
          this._deviceService.deleteDevice(device.inventory_cod).subscribe(
            resp => {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'borrado ' + i + ' de ' + this.selectedDevices.length + ' seleccionados', life: 1000 });

            },
            err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ' + i + ' de ' + this.selectedDevices.length + ' seleccionados', life: 1000 });
            }
          )
        }
        this.selectedDevices = [];
        this.getDevices()
      }
    });
  }

  editDevice(device: Device) {
    this.device = { ...device };
    this.deviceDialog = true;
  }

  deleteDevice(device: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro sobre eliminar este equipo ' + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*       this.types = this.types.filter(val => val.id !== type.id); */
        this._deviceService.deleteDevice(device.inventory_cod).subscribe(
          resp => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro borrado satisfactoriamenete', life: 3000 });
            this.getDevices()
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

  saveDevice() {
    this.submitted = true;
    console.log(this.device);

    if (this.device.inventory_cod !== undefined && this.device.inventory_cod!= null) {
      if (this.device.created_at) {
        delete this.device.created_at
      }
      if (this.device.updated_at) {
        delete this.device.updated_at
      }
      console.log('date purchased',this.device.date_purchase);
      
      let dateToChange = new Date(this.device.date_purchase).toISOString().split('T')[0]
      this.device.date_purchase = dateToChange
      console.log('fecha cambiada',this.device.date_purchase);
      delete this.device.fecha
      this._deviceService.updateDevice(this.device).subscribe(
        resp => {
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getDevices()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
          this.hideDialog()
        }
      )
    } else {
      this._deviceService.saveDevice(this.device).subscribe(
        resp => {
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getDevices()
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
