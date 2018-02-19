import { ClienteContacto } from "./clientContact.model";
import { environment } from "../../environments/environment";

export class Client {

    public constructor() {
        this.clientesContactos = [];
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

    private _avatar: string;

    clientesContactos: ClienteContacto[];

    set avatar(avatar: string) {
        this._avatar = avatar;
    }
    get avatar(): string {
        if (this._avatar) {
            return [environment.filescontainer, this.codigo, this._avatar].join('/');
        } else {
            return '';
        }
    }
}