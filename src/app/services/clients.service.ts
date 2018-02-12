import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Client } from '../models/client.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

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
  getClient(id: number): Observable<Client> {
    return this.http.get<Client>('Clientes/' + id)
    .map(res => this.parseObject(res));
  }
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('Clientes')
      .map(res => this.parseArray(res));
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
