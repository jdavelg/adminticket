import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EditableRow, Table, TableModule } from 'primeng/table';
import { User } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService, EditableRow],
  /* styles: [`
  :host ::ng-deep .p-cell-editing {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
  }
`] */
})
export class UsersComponent implements OnInit {
  users: User[]
  user: User
  departments: []
  clonedUsers: { [s: string]: User; } = {};
  constructor(private _userService: UsersService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getDepartments()
    this.getUsers()
  }

  statuses = [
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'DEFAULT', value: 'DEFAULT' },
    { label: 'TECHNICAL', value: 'TECHNICAL' }
  ]

  getUsers() {
    this._userService.getUsers().subscribe(res => {
      if (res) {
        this.users = res
      }
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      })
  }

  getDepartments() {
    this._userService.getDepartments().subscribe(res => {
      if (res) {
        this.departments = res
      }
    },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      })
  }
  onRowEditInit(user: any) {
    /*   console.log(user); */

    this.clonedUsers[user.id] = { ...user };
  }

  onRowEditSave(user: any) {
    if (user) {
      if (user.created_at) {
        delete user.created_at
      }

      if (user.updated_at) {
        delete user.updated_at
      }
      this._userService.updateUser(user).subscribe(
        res => {
          delete this.clonedUsers[user.id];
          this.getUsers()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Usuario se ha actualizado' });
        },
        err => {
          delete this.clonedUsers[user.id];
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
        }
      )



    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'error al seleccionar usuario' });
    }
  }

  onRowEditCancel(user?: any) {
    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se actualizó el registro' });
  }
  clear(table: Table) {
    table.clear();
  }

}
