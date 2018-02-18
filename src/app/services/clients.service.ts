import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Client } from '../models/client.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Paged } from '../models/paged.model';

@Injectable()
export class ClientService {

  _clients: Client[] = [];

  constructor(
    private http: HttpClient
  ) { }

  parseObject(client:Client){
    let newClient:Client = new Client();
    Object.assign(newClient, client);
    return newClient;
  }
  parseArray(clients: Client[]): Client[] {
    let clientsNew: Client[] = [];
    for (let client of clients) {
      clientsNew.push(this.parseObject(client));
    }
    return clientsNew;
  }
  parsePaged(res:Paged<Client>): Paged<Client>{
    let result: Paged<Client>  = new Paged<Client>();
    result.paging = res.paging;
    result.paging.pageNumber--;
    result.items = this.parseArray(res.items);
    return result;
  }
  getClient(id: number): Observable<Client> {
    return this.http.get<Client>('Clientes/' + id)
    .map(res => this.parseObject(res));
  }
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('Clientes')
      .map(res => this.parseArray(res));
  }
  getClientsPaged(page:number,size:number): Observable<Paged<Client>> {
    return this.http.get<Paged<Client>>('Paginator/GetClientes?PageNumber='+(page+1)+'&PageSize='+size)
      .map(res => this.parsePaged(res));
  }
  editClient(client: Client): Observable<Client> {
    return this.http.put<Client>('Clientes/' + client.id, client)
    .map(res => this.parseObject(res));
  }
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>('Clientes/', client)
    .map(res => this.parseObject(res));
  }
  deleteClient(client: Client): Observable<Client> {
    return this.http.delete<Client>('Clientes/' + client.id)
    .map(res => this.parseObject(res));
  }
  saveAvatar(clientId: number, file: any): Observable<string> {
    return this.http.post<string>('Clientes/UploadProfilePicture/' + clientId, file);
  }
}
