import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Tcategory } from 'src/app/interfaces/tcategory';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-tcategory',
  templateUrl: './tcategory.component.html',
  styleUrls: ['./tcategory.component.css'],
  providers:[ MessageService]
})
export class TcategoryComponent implements OnInit {

  categories: Tcategory[]
  category: Tcategory
  clonedCategories: { [s: string]: Tcategory; } = {};

  categoryDialog: boolean;



  selectedCategories: Tcategory[];

  submitted: boolean;

  statuses: any[];

  constructor(private _ticketService: TicketsService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
  }

  getCategories() {
    this._ticketService.getCategories().subscribe(
      resp => {
        this.categories = resp

      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )
  }
  /* new code  */
  openNew() {
    this.category = {}
    this.submitted = false;
    this.categoryDialog = true;
  }

  deleteSelectedCategories() {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar este departamento?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        for (var i = 0; i < this.selectedCategories.length; i++) {
          let departamento = this.selectedCategories[i]
          this._ticketService.deleteCategory(departamento.id).subscribe(
            resp => {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'borrado ' + i + ' de ' + this.selectedCategories.length + ' seleccionados', life: 1000 });
            },
            err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ' + i + ' de ' + this.selectedCategories.length + ' seleccionados', life: 1000 });
            }
          )
        }


        this.selectedCategories = [];
        this.getCategories()
      }
    });
  }

  editType(category: Tcategory) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro sobre eliminar ' + category.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*       this.types = this.types.filter(val => val.id !== type.id); */
        this._ticketService.deleteCategory(category.id).subscribe(
          resp => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro borrado satisfactoriamenete', life: 3000 });
            this.getCategories()
          },
          err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ', life: 3000 });
          }
        )
        this.category = {};

      }
    });
  }

  hideDialog() {
    this.category = {}
    this.categoryDialog = false;
    this.submitted = false;
  }

  saveType() {
    this.submitted = true;
    if (this.category.id !== undefined && this.category.id != null) {
       if (this.category.created_at) {
      delete this.category.created_at
    }
    if (this.category.updated_at) {
      delete this.category.updated_at
    }
    this._ticketService.updateCategory(this.category).subscribe(
      resp => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
        this.getCategories()
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
      }
    )
    } else {
      this._ticketService.saveCategory(this.category).subscribe(
        resp => {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getCategories()
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
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === id) {
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
