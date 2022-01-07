import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any
  constructor() { }

  ngOnInit(): void {
  }

}
