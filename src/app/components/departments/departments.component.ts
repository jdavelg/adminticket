import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { EditableRow } from 'primeng/table';
import { Department } from 'src/app/interfaces/department';
import { UsersService } from 'src/app/services/users.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  providers: [MessageService, EditableRow, ConfirmationService],
})
export class DepartmentsComponent implements OnInit {
  departments: Department[]
  department: Department
  clonedDepartments: { [s: string]: Department; } = {};

  departmentDialog: boolean;



  selectedDepartments: Department[];

  submitted: boolean;

  statuses: any[];


  constructor(private _userService: UsersService, private messageService: MessageService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) {

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getDepartments()
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  getDepartments() {
    this._userService.getDepartments().subscribe(
      resp => {
        this.departments = resp

      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )
  }


  /* onRowEditInit(department: any) {
 

    this.clonedDepartments[department.id] = { ...department };
  }

  onRowEditSave(department: any) {
    if (department) {
      if (department.created_at) {
        delete department.created_at
      }

      if (department.updated_at) {
        delete department.updated_at
      }
      this._userService.updateUser(department).subscribe(
        res => {
          delete this.clonedDepartments[department.id];
          this.getDepartments()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Departamento se ha actualizado' });
        },
        err => {
          delete this.clonedDepartments[department.id];
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
        }
      )



    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'error al seleccionar Departamento' });
    }
  }

  onRowEditCancel(user?: any) {
    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se actualizó el registro' });
  } */



  /* new code  */
  openNew() {
    this.department = {}
    this.submitted = false;
    this.departmentDialog = true;
  }

  deleteSelectedDepartments() {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar este departamento?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        for (var i = 0; i < this.selectedDepartments.length; i++) {
          let departamento = this.selectedDepartments[i]
          this._userService.deleteDepartment(departamento.id).subscribe(
            resp => {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'borrado ' + i + ' de ' + this.selectedDepartments.length + ' seleccionados', life: 1000 });
            },
            err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ' + i + ' de ' + this.selectedDepartments.length + ' seleccionados', life: 1000 });
            }
          )
        }


        this.selectedDepartments = [];
        this.getDepartments()
      }
    });
  }

  editDepartment(department: Department) {
    this.department = { ...department };
    this.departmentDialog = true;
  }

  deleteDepartment(department: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro sobre eliminar' + department.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*       this.departments = this.departments.filter(val => val.id !== department.id); */
        this._userService.deleteDepartment(department.id).subscribe(
          resp => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro borrado satisfactoriamenete', life: 3000 });
            this.getDepartments()
          },
          err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ', life: 3000 });
          }
        )
        this.department = {};

      }
    });
  }

  hideDialog() {
    this.department = {}
    this.departmentDialog = false;
    this.submitted = false;
  }

  saveDepartment() {
    this.submitted = true;
    if (this.department.id != null && this.department.id !== undefined) {
      if (this.department.created_at) {
        delete this.department.created_at
      }
      if (this.department.updated_at) {
        delete this.department.updated_at
      }
      this._userService.updateDepartment(this.department).subscribe(
        resp => {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.hideDialog()
          this.getDepartments()


        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
          this.hideDialog()
        }
      )
    } else {
      this._userService.saveDepartment(this.department).subscribe(
        resp => {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.hideDialog()
          this.getDepartments()


        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
          this.hideDialog()
        }
      )
    }

    /*    if (this.department.name) {
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
   
           this.departments = [...this.departments];
           this.departmentDialog = false;
           this.department = undefined;
       } */


  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.departments.length; i++) {
      if (this.departments[i].id === id) {
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
