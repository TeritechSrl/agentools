import { ClienteContacto } from "./clientContact.model";

export class Client{

    public constructor(){
        this.clientesContactos = [];
    }
    id:number;

    nombreCompleto:string;

    genero:string;

    identificacion:string;

    fechaNacimiento:string;

    direccion:string;

    correo:string;

    notas:string;

    avatar:string;

    clientesContactos:ClienteContacto[];
}