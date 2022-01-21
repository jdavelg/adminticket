import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Mark } from 'src/app/interfaces/mark';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class MarkComponent implements OnInit {


  marks: Mark[]
  mark: Mark
  clonedMarks: { [s: string]: Mark; } = {};

  markDialog: boolean;



  selectedMarks: Mark[];

  submitted: boolean;

  statuses: any[];

  constructor(private _deviceService: DevicesService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
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
  /* new code  */
  openNew() {
    this.mark = {}
    this.submitted = false;
    this.markDialog = true;
  }

  deleteSelectedMarks() {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar este departamento?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        for (var i = 0; i < this.selectedMarks.length; i++) {
          let departamento = this.selectedMarks[i]
          this._deviceService.deleteMark(departamento.id).subscribe(
            resp => {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'borrado ' + i + ' de ' + this.selectedMarks.length + ' seleccionados', life: 1000 });
            },
            err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ' + i + ' de ' + this.selectedMarks.length + ' seleccionados', life: 1000 });
            }
          )
        }


        this.selectedMarks = [];
        this.getMarks()
      }
    });
  }

  editMark(mark: Mark) {
    this.mark = { ...mark };
    this.markDialog = true;
  }

  deleteMark(mark: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro sobre eliminar ' + mark.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*       this.types = this.types.filter(val => val.id !== type.id); */
        this._deviceService.deleteMark(mark.id).subscribe(
          resp => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro borrado satisfactoriamenete', life: 3000 });
            this.getMarks()
          },
          err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ', life: 3000 });
          }
        )
        this.mark = {};

      }
    });
  }

  hideDialog() {
    this.mark = {}
    this.markDialog = false;
    this.submitted = false;
  }

  saveMark() {
    this.submitted = true;
    if (this.mark.id !== undefined && this.mark.id != null) {
      if (this.mark.created_at) {
        delete this.mark.created_at
      }
      if (this.mark.updated_at) {
        delete this.mark.updated_at
      }
      this._deviceService.updateMark(this.mark).subscribe(
        resp => {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getMarks()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
        }
      )
    } else {
      this._deviceService.saveMark(this.mark).subscribe(
        resp => {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getMarks()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
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
           this.categoryDialog = false;
           this.type = undefined;
       } */


  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.marks.length; i++) {
      if (this.marks[i].id === id) {
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
