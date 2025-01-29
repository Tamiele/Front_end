export interface iLoginResponse {
  message: string | null;
  token: string; //che contiene anche i ruoli  che ho previsto
  username: string;
  nome: string;
  cognome: string;
  email: string;
  dataDiNascita: string;
}
