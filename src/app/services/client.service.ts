// import { Injectable } from '@angular/core';
// import { Client } from '../models/client.model';

// const KEY = 'clients';
// const ID = 'clients_next_id';

// @Injectable({ providedIn: 'root' })
// export class ClientService {
//   private nextId() {
//     const n = parseInt(localStorage.getItem(ID) || '1',10);
//     localStorage.setItem(ID, (n+1).toString());
//     return n;
//   }
//   getAll(): Client[] {
//     const d=localStorage.getItem(KEY);
//     return d?JSON.parse(d):[];
//   }
//   saveAll(list: Client[]) {
//     localStorage.setItem(KEY, JSON.stringify(list));
//   }
//   add(c: Omit<Client,'id'|'createdAt'>) {
//     const all = this.getAll();
//     const cli: Client = { id:this.nextId(), createdAt:new Date().toISOString(), ...c };
//     all.push(cli);
//     this.saveAll(all);
//     return cli;
//   }
//   update(u: Client) {
//     this.saveAll(this.getAll().map(c=>c.id===u.id?u:c));
//   }
//   delete(id: number) {
//     this.saveAll(this.getAll().filter(c=>c.id!==id));
//   }
// }
// src/app/services/client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private api = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.api);
  }

  add(cli: Omit<Client, 'id' | 'createdAt'>): Observable<Client> {
    const payload = { ...cli, createdAt: new Date().toISOString() };
    return this.http.post<Client>(this.api, payload);
  }

  update(cli: Client): Observable<Client> {
    return this.http.put<Client>(`${this.api}/${cli.id}`, cli);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
