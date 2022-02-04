import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Ticket } from 'src/app/interfaces/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class TicketComponent implements OnInit {
  tickets: Ticket[]
  ticket: Ticket
  clonedTickets: { [s: string]: Ticket; } = {};

  ticketDialog: boolean;

  today = new Date()

  selectedTickets: Ticket[];

  submitted: boolean;

  types: any[];
  categories: any[]
  users: any[]
  equipmentTypes: any[]
  constructor(private _ticketsService: TicketsService, private _usersService: UsersService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {

    this.getCategories()
    this.getEmployees()
    this.getTypes()
    this.getTickets()
  }

  getCategories() {
    this._ticketsService.getCategories().subscribe(
      resp => {
        this.categories = resp
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )
  }
  getTypes() {

    this._ticketsService.getTypes().subscribe(
      resp => {
        this.types = resp
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });

      }
    )
  }
  getEmployees() {
    this._usersService.getUsers().subscribe(
      resp => {
        this.users = resp
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )

  }
  getTickets() {
    this._ticketsService.getTickets().subscribe(
      resp => {
        this.tickets = resp
      
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al conectarse al servidor' });
      }
    )
  }
  /* new code  */
  openNew() {
    this.ticket = {}
    this.submitted = false;
    this.ticketDialog = true;
  }

  deleteSelectedTickets() {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar este ticket?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        for (var i = 0; i < this.selectedTickets.length; i++) {
          let ticket = this.selectedTickets[i]
          this._ticketsService.deleteTicket(ticket.id).subscribe(
            resp => {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'borrado ' + i + ' de ' + this.selectedTickets.length + ' seleccionados', life: 1000 });

            },
            err => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ' + i + ' de ' + this.selectedTickets.length + ' seleccionados', life: 1000 });
            }
          )
        }
        this.selectedTickets = [];
        this.getTickets()
      }
    });
  }

  editTicket(ticket: Ticket) {
    this.ticket = { ...ticket };
    this.ticketDialog = true;
  }

  deleteTicket(ticket: any) {
    this.confirmationService.confirm({
      message: 'Estas seguro sobre eliminar este equipo ' + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*       this.types = this.types.filter(val => val.id !== type.id); */
        this._ticketsService.deleteTicket(ticket.id).subscribe(
          resp => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro borrado satisfactoriamenete', life: 3000 });
            this.getTickets()
          },
          err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar registro ', life: 3000 });
          }
        )
        this.ticket = {};

      }
    });
  }

  hideDialog() {
    this.ticket = {}
    this.ticketDialog = false;
    this.submitted = false;
  }

  saveTicket() {
    this.submitted = true;
    console.log(this.ticket);

 
      if (this.ticket.created_at) {
        delete this.ticket.created_at
      }
      if (this.ticket.updated_at) {
        delete this.ticket.updated_at
      }
 
      this._ticketsService.updateTicket(this.ticket).subscribe(
        resp => {
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getTickets()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
          this.hideDialog()
        }
      )
   /*  } else {
      this._ticketsService.saveTicket(this.ticket).subscribe(
        resp => {
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado', life: 3000 });
          this.getTickets()
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor al guardar el registro', life: 3000 });
          this.hideDialog()
        }
      )
    } */

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
    for (let i = 0; i < this.tickets.length; i++) {
      if (this.tickets[i].id === id) {
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
