import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Ttypes } from 'src/app/interfaces/ttypes';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ttypes',
  templateUrl: './ttypes.component.html',
  styleUrls: ['./ttypes.component.css'],
  providers: [MessageService]
})
export class TtypesComponent implements OnInit {
  types: Ttypes[]
  type: Ttypes
  clonedTtypess: { [s: string]: Ttypes; } = {};

  typeDialog: boolean;



  selectedTypes: Ttypes[];

  submitted: boolean;

  statuses: any[];

  constructor(private _ticketService: TicketsService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.getTypes()
  }

  getTypes() {
    this._ticketService.getTypes().subscribe(
      resp => {
        this.types = resp

      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )
  }
  /* new code  */
  openNew() {
    this.type = {}
    this.submitted = false;
    this.typeDialog = true;
  }

  deleteSelectedTypes() {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar este departamento?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        for (var i = 0; i < this.selectedTypes.length; i++) {
          let departamento = this.selectedTypes[i]
          this._ticketService.deleteType(departamento.id).subscribe(
            resp => {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'borrado ' + i + ' de ' + this.selectedTypes.length + ' seleccionados', life: 1000 });

            },
            err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ' + i + ' de ' + this.selectedTypes.length + ' seleccionados', life: 1000 });
            }
          )
        }


        this.selectedTypes = [];
        this.getTypes()
      }
    });
  }

  editType(type: Ttypes) {
    this.type = { ...type };
    this.typeDialog = true;
  }

  deleteType(type: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro sobre eliminar ' + type.name + ' ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*       this.types = this.types.filter(val => val.id !== type.id); */
        this._ticketService.deleteType(type.id).subscribe(
          resp => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro eliminado satisfactoriamente', life: 3000 });
            this.getTypes()
          },
          err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ', life: 3000 });
          }
        )
        this.type = {};

      }
    });
  }

  hideDialog() {
    this.type = {}
    this.typeDialog = false;
    this.submitted = false;
  }

  saveType() {
    this.submitted = true;
    if (this.type.id!== undefined && this.type.id!== null ) {
      if (this.type.created_at) {
        delete this.type.created_at
      }
      if (this.type.updated_at) {
        delete this.type.updated_at
      }
      this._ticketService.updateType(this.type).subscribe(
        resp => {
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getTypes()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
          this.hideDialog()
        }
      )
    } else {
      this._ticketService.saveType(this.type).subscribe(
        resp => {
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getTypes()
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
    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i].id === id) {
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
