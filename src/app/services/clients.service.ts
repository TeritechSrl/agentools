import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Client } from '../models/client.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {

  // baseUrl:string = "https://teritechapi.azurewebsites.net/api/";
  baseUrl:string = "http://localhost:50776/api/";

  _clients:Client[] = [];

  constructor (
    private http: Http
  ) {}

  getClient(id:number):Observable<Client>{
    return this.http.get(this.baseUrl+'Clientes/'+id)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  getClients():Observable<Client[]> {
    return this.http.get(this.baseUrl+'Clientes')
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  editClient(client:Client):Observable<Client>{
    return this.http.put(this.baseUrl+'Clientes/'+client.id,client)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  createClient(client:Client):Observable<Client>{
    return this.http.post(this.baseUrl+'Clientes/',client)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
