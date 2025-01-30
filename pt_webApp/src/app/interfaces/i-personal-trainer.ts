import { iCliente } from './i-cliente';
import { iUser } from './i-user';

export interface iPersonalTrainer extends iUser {
  clienti: iCliente[];
}
