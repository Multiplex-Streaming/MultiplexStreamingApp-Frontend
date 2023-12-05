import { GeneroModel } from "./generoModel";

export class PeliculaModel {
    id: Number = 0;
    titulo:string = "";
    descripcion:string = "";
    duracion: string = "";
    elenco: string = ""; // si es importante para setearlo en localstorage
    url:string = "";
    generos?:[GeneroModel];
    portada: string = "";
    file: File | null = null;
    portadaFile: File | null = null;
}