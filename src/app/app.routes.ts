import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      // Programs
      {
        path: 'programs',
        loadComponent: () =>
          import('./components/program-list/program-list.component').then(m => m.ProgramListComponent),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(m => m.HomeComponent),
      },
      // Clients
      {
        path: 'clients',
        loadComponent: () =>
          import('./components/client-list/client-list.component').then(m => m.ClientListComponent),
      },
      {
        path: 'clients/add',
        loadComponent: () =>
          import('./components/client-form/client-form.component').then(m => m.ClientFormComponent),
        data: { mode: 'add' }
      },
      {
        path: 'clients/edit/:id',
        loadComponent: () =>
          import('./components/client-form/client-form.component').then(m => m.ClientFormComponent),
        data: { mode: 'edit' }
      },
      {
        path: 'clients/view/:id',
        loadComponent: () =>
          import('./components/client-view/client-view.component').then(m => m.ClientViewComponent),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
