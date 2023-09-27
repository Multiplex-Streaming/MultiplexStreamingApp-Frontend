import { CapituloModel } from "./capituloModel";

export class SerieModel 
{
    id: Number = 0;
    nombre: string = "";
    descripcion: string = "";
    cantidadCapitulos: Number = 0;
    url: string = "";
    portada: string = "";
    capitulos?:[CapituloModel];
    portadaFile: File | null = null;
}