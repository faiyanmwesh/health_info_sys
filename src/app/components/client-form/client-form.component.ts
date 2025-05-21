// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, NgForm } from '@angular/forms';
// import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
// import { ClientService } from '../../services/client.service';
// import { Client } from '../../models/client.model';
// import { ProgramService } from '../../services/program.service';
// import { Program } from '../../models/program.model';

// @Component({
//   selector: 'app-client-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './client-form.component.html',
//   styleUrls: ['./client-form.component.css'],
// })
// export class ClientFormComponent implements OnInit {
//   mode: 'add'|'edit' = 'add';
//   formModel: Partial<Client> = { enrolledProgramIds: [] };
//   clientId?: number;
//   programs: Program[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private svc: ClientService,
//     private ps: ProgramService
//   ) {}

//   ngOnInit(): void {
//     this.programs = this.ps.getAll();
//     this.mode = this.route.snapshot.data['mode'];
//     if (this.mode==='edit') {
//       this.clientId = +this.route.snapshot.paramMap.get('id')!;
//       const c = this.svc.getAll().find(x=>x.id===this.clientId);
//       if (!c) {
//         this.router.navigate(['/dashboard/clients']).then(() => {});
//         return;
//       }
//       this.formModel = { ...c };
//     }
//   }

//   onSubmit(f: NgForm) {
//     if (!f.valid) return;
//     if (this.mode==='add') {
//       this.svc.add({
//         firstName:this.formModel.firstName!.trim(),
//         lastName:this.formModel.lastName!.trim(),
//         email:this.formModel.email!.trim(),
//         enrolledProgramIds:this.formModel.enrolledProgramIds||[]
//       });
//     } else {
//       this.svc.update(this.formModel as Client);
//     }
//     this.router.navigate(['/dashboard/clients']);
//   }
// }
// src/app/clients/client-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { ProgramService } from '../../services/program.service';
import { Program } from '../../models/program.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  mode: 'add' | 'edit' = 'add';
  formModel: Partial<Client> = { enrolledProgramIds: [] };
  clientId?: number;
  programs: Program[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: ClientService,
    private ps: ProgramService
  ) {}

  ngOnInit(): void {
    // fetch programs for the multi-select
    this.ps.getAll().subscribe(progs => (this.programs = progs));

    this.mode = this.route.snapshot.data['mode'];
    if (this.mode === 'edit') {
      this.clientId = Number(this.route.snapshot.paramMap.get('id'));
      // fetch the client to edit
      this.svc.getAll().subscribe(list => {
        const c = list.find(x => x.id === this.clientId);
        if (!c) {
          this.router.navigate(['/dashboard/clients']);
          return;
        }
        this.formModel = { ...c };
      });
    }
  }

  onSubmit(f: NgForm) {
    if (!f.valid) return;

    const payload: Omit<Client, 'id' | 'createdAt'> = {
      firstName: this.formModel.firstName!.trim(),
      lastName: this.formModel.lastName!.trim(),
      email: this.formModel.email!.trim(),
      enrolledProgramIds: this.formModel.enrolledProgramIds || [],
    };

    if (this.mode === 'add') {
      this.svc.add(payload).subscribe(() => {
        this.router.navigate(['/dashboard/clients']);
      });
    } else {
      // full Client for update
      const updated: Client = {
        id: this.clientId!,
        createdAt: (this.formModel.createdAt as string),
        ...payload,
      };
      this.svc.update(updated).subscribe(() => {
        this.router.navigate(['/dashboard/clients']);
      });
    }
  }
}
