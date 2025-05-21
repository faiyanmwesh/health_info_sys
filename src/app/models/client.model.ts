// src/app/clients/client.model.ts
export interface Client {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    enrolledProgramIds: number[];
    createdAt: string; // ISO date
  }
  