import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EditableRow, TableModule } from 'primeng/table';
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

  constructor(private _userService: UsersService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getUsers()
  }

  statuses = [
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'DEFAULT', value: 'DEFAULT' },
    { label: 'TECHNICAL', value: 'TECHNICAL' }
  ]
  clonedUsers: { [s: string]: User; } = {};
  getUsers() {
    this._userService.getUsers().subscribe(res => {
      if (res) {
        console.log(res);
        this.users = res

      }
    },
      err => {
        console.log(err);

      })
  }

  onRowEditInit(user: any) {
    /*   console.log(user); */

    this.clonedUsers[user.id] = { ...user };
  }

  onRowEditSave(user: any) {
    if (user) {
     console.log(user);
     

      delete this.clonedUsers[user.id];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'user is updated' });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel(user: any) {
    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se actualizó el registro' });
  }

}
