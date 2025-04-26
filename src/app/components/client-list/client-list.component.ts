// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ClientService } from '../../services/client.service';
// import { Client } from '../../models/client.model';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-client-list',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './client-list.component.html',
//   styleUrls: ['./client-list.component.css'],
// })
// export class ClientListComponent implements OnInit {
//   clients: Client[] = [];
//   constructor(public svc: ClientService) {}
//   ngOnInit() {
//     this.clients = this.svc.getAll().sort((a,b)=>b.id-a.id);
//   }
// }
// src/app/clients/client-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // brings in routerLink & friends
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent {
  clients$: Observable<Client[]>;

  constructor(public svc: ClientService) {
    this.clients$ = this.svc.getAll().pipe(
      map(list => list.sort((a, b) => b.id - a.id))
    );
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.svc.delete(id).subscribe();
    }
  }
}

