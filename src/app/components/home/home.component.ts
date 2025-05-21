// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin, finalize } from 'rxjs';
import { ProgramService } from '../../services/program.service';
import { ClientService } from '../../services/client.service';
import { Program } from '../../models/program.model';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalPrograms = 0;
  totalClients = 0;
  recentPrograms: Program[] = [];
  recentClients: Client[] = [];
  loading = true;

  constructor(
    private progSvc: ProgramService,
    private clientSvc: ClientService
  ) {}

  ngOnInit() {
    this.loading = true;
    forkJoin({
      programs: this.progSvc.getAll(),
      clients: this.clientSvc.getAll()
    })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ programs, clients }) => {
        const sortedProg = programs.sort((a, b) => b.id - a.id);
        const sortedCli = clients.sort((a, b) => b.id - a.id);

        this.totalPrograms = sortedProg.length;
        this.totalClients = sortedCli.length;

        this.recentPrograms = sortedProg.slice(0, 5);
        this.recentClients = sortedCli.slice(0, 5);
      });
  }
}
