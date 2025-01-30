import { iUser } from './i-user';

export interface iLoginResponse {
  token: string; //che contiene anche i ruoli  che ho previsto
  user: iUser;
}
