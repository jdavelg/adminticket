import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit {
  users: any
  constructor(private _userService: UsersService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUsers()
  }


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

  onRowEditInit() {

  }

  onRowEditSave() {

  }

  onRowEditCancel() {

  }

}
