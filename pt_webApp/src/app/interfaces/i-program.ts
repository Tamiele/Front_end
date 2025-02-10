export interface iProgram {
  id?: number;
  name: string;
  description: string;
  template: boolean;
  personalTrainerId?: number;
  assignedClients?: number[];
}
