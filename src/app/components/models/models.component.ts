import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Model } from 'src/app/interfaces/model';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css'],
  providers: [MessageService, ConfirmationService],
  styles: [`
        :host ::ng-deep .p-dialog  {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
})
export class ModelsComponent implements OnInit {
  models: Model[]
  model: Model
  clonedModels: { [s: string]: Model; } = {};

  modelDialog: boolean;



  selectedModels: Model[];

  submitted: boolean;

  statuses: any[];
  marks: any[]

  constructor(private _deviceService: DevicesService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.getModels()
    this.getMarks()
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

  getModels() {
    this._deviceService.getEquipmentModels().subscribe(
      resp => {
        this.models = resp
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )
  }
  /* new code  */
  openNew() {
    this.model = {}
    this.submitted = false;
    this.modelDialog = true;
  }

  deleteSelectedModels() {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar este modelo?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        for (var i = 0; i < this.selectedModels.length; i++) {
          let modelo = this.selectedModels[i]
          this._deviceService.deleteEquipmentModel(modelo.id).subscribe(
            resp => {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'borrado ' + i + ' de ' + this.selectedModels.length + ' seleccionados', life: 1000 });

            },
            err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ' + i + ' de ' + this.selectedModels.length + ' seleccionados', life: 1000 });
            }
          )
        }
        this.selectedModels = [];
        this.getModels()
      }
    });
  }

  editModel(model: Model) {
    this.model = { ...model };
    this.modelDialog = true;
  }

  deleteModel(model: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro sobre eliminar' + model.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*       this.types = this.types.filter(val => val.id !== type.id); */
        this._deviceService.deleteEquipmentModel(model.id).subscribe(
          resp => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro borrado satisfactoriamenete', life: 3000 });
            this.getModels()
          },
          err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ', life: 3000 });
          }
        )
        this.model = {};

      }
    });
  }

  hideDialog() {
    this.model = {}
    this.modelDialog = false;
    this.submitted = false;
  }

  saveModel() {
    this.submitted = true;
    console.log(this.model);

    if (this.model.id !== undefined && this.model.id != null) {
      if (this.model.created_at) {
        delete this.model.created_at
      }
      if (this.model.updated_at) {
        delete this.model.updated_at
      }
      this._deviceService.updateEquipmentModel(this.model).subscribe(
        resp => {
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getModels()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
          this.hideDialog()
        }
      )
    } else {
      this._deviceService.saveEquipmentModel(this.model).subscribe(
        resp => {
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getModels()
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
    for (let i = 0; i < this.models.length; i++) {
      if (this.models[i].id === id) {
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
