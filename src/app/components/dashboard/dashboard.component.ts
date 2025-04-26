// dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  sidebarCollapsed = false;
  currentUser = 'Doctor'
  currentDate = new Date();

  toggleSidebar(event: MouseEvent) {
    event.stopPropagation();
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  // onContentClick() {
  //   if (!this.sidebarCollapsed) {
  //     this.sidebarCollapsed = true;
  //   }
  // }
}
