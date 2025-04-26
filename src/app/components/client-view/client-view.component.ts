// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { ClientService } from '../../services/client.service';
// import { Client } from '../../models/client.model';
// import { ProgramService } from '../../services/program.service';
// import { Program } from '../../models/program.model';

// @Component({
//   selector: 'app-client-view',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './client-view.component.html',
// })
// export class ClientViewComponent implements OnInit {
// getProgramName(_t20: number) {
// throw new Error('Method not implemented.');
// }
//   client?: Client;
//   programs: Program[] = [];
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private cs: ClientService,
//     private ps: ProgramService
//   ) {}
//   ngOnInit() {
//     const id = +this.route.snapshot.paramMap.get('id')!;
//     this.client = this.cs.getAll().find(c=>c.id===id);
//     if (!this.client) this.router.navigate(['/dashboard/clients']);
//     this.programs = this.ps.getAll();
//   }
// }
// src/app/clients/client-view.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { forkJoin, finalize } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { ProgramService } from '../../services/program.service';
import { Client } from '../../models/client.model';
import { Program } from '../../models/program.model';

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-view.component.html',
})
export class ClientViewComponent implements OnInit {
  client?: Client;
  programs: Program[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cs: ClientService,
    private ps: ProgramService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin({
      clients: this.cs.getAll(),
      progs: this.ps.getAll()
    })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ clients, progs }) => {
        this.programs = progs;
        this.client = clients.find(c => c.id === id);
        if (!this.client) {
          this.router.navigate(['/dashboard/clients']);
        }
      });
  }

  getProgramName(id: number): string {
    return this.programs.find(p => p.id === id)?.name || '—';
  }
}
