export class LoginRequest {
    Email:string = "";
    Password:string = "";
    Token?: string;
    idCliente?: any; // si es importante para setearlo en localstorage
    Nombre:string = "";
    Apellido:string = "";
  }