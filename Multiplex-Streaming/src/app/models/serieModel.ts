import { CapituloModel } from "./capituloModel";

export class SerieModel 
{
    id: Number = 0;
    nombre: string = "";
    descripcion: string = "";
    cantidadCapitulos: Number = 0;
    url: string = "";
    capitulos?:[CapituloModel];
}