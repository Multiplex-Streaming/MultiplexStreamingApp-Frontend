import { GeneroModel } from "./generoModel";

export class PeliculaModel {
    titulo:string = "";
    descripcion:string = "";
    duracion: string = "";
    elenco: string = ""; // si es importante para setearlo en localstorage
    url:string = "";
    generos?:[GeneroModel];
}