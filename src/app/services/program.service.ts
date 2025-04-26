// // src/app/programs/program.service.ts
// import { Injectable } from '@angular/core';
// import { Program } from '../models/program.model';

// const STORAGE_KEY = 'programs';
// const ID_KEY = 'programs_next_id';

// @Injectable({ providedIn: 'root' })
// export class ProgramService {
//   private getNextId(): number {
//     const next = parseInt(localStorage.getItem(ID_KEY) || '1', 10);
//     localStorage.setItem(ID_KEY, String(next + 1));
//     return next;
//   }

//   getAll(): Program[] {
//     const data = localStorage.getItem(STORAGE_KEY);
//     return data ? JSON.parse(data) : [];
//   }

//   saveAll(programs: Program[]) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
//   }

//   add(program: Omit<Program, 'id' | 'createdAt'>) {
//     const list = this.getAll();
//     const newProg: Program = {
//       id: this.getNextId(),
//       createdAt: new Date().toISOString(),
//       ...program,
//     };
//     list.push(newProg);
//     this.saveAll(list);
//     return newProg;
//   }

//   update(updated: Program) {
//     const list = this.getAll().map(p => p.id === updated.id ? updated : p);
//     this.saveAll(list);
//   }

//   delete(id: number) {
//     const list = this.getAll().filter(p => p.id !== id);
//     this.saveAll(list);
//   }
// }
// src/app/services/program.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from '../models/program.model';

@Injectable({ providedIn: 'root' })
export class ProgramService {
  private api = 'http://localhost:3000/programs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Program[]> {
    return this.http.get<Program[]>(this.api);
  }

  add(prog: Omit<Program, 'id' | 'createdAt'>): Observable<Program> {
    const payload = { ...prog, createdAt: new Date().toISOString() };
    return this.http.post<Program>(this.api, payload);
  }

  update(prog: Program): Observable<Program> {
    return this.http.put<Program>(`${this.api}/${prog.id}`, prog);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

