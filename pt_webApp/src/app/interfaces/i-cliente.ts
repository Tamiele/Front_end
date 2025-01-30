import { iUser } from './i-user';

export interface iCliente extends iUser {
  personalTrainerId?: number | null;
}
