import { ClienteContacto } from "./clientContact.model";
import { environment } from "../../environments/environment";

export class Client {

    public constructor() {
        this.clientesContactos = [];
        this.activo = true;
    }
    
    id: number;

    nombreCompleto: string;

    codigo: string;

    genero: string;

    identificacion: string;

    fechaNacimiento: string;

    direccion: string;

    correo: string;

    notas: string;

    avatar: string;

    avatarPreview: string;

    activo:boolean;

    clientesContactos: ClienteContacto[];

    get avatarUrl(): string {
        if (this.avatar) {
            return [environment.filescontainer, this.codigo, this.avatar].join('/');
        } else {
            return '';
        }
    }
}