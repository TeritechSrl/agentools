import { Paged } from "../../models/paged.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

export abstract class GenericModelService<T> {
    abstract getModelInstance(): T;
    protected _controllerName: string;
    get controllerName(){
        return this._controllerName;
    }
    constructor(
        protected http: HttpClient,
        controllerName: string) {
        this._controllerName = controllerName;
    }
    get(id: number): Observable<T> {
        return this.http.get<T>(this._controllerName + '/' + id)
            .map(res => this.parseObject(res));
    }
    public getList(): Observable<T[]> {
        return this.http.get<T[]>(this._controllerName)
            .map(res => this.parseArray(res));
    }
    getListPaged(page: number, size: number, filter:string): Observable<Paged<T>> {
        return this.http.get<Paged<T>>(`Paginator/Get${this._controllerName}?PageNumber=${page + 1}&PageSize=${size}&filter=${filter}`)
            .map(res => this.parsePaged(res));
    }
    edit(model: T, id: number): Observable<T> {
        return this.http.put<T>(this._controllerName + '/' + id, model)
            .map(res => this.parseObject(res));
    }
    create(model: T): Observable<T> {
        return this.http.post<T>(this._controllerName, model)
        .map(res => this.parseObject(res));
      }
      delete(id:number): Observable<T> {
        return this.http.delete<T>(this._controllerName + '/' + id)
        .map(res => this.parseObject(res));
      }
    parseObject(model: T) {
        let newClient: T = this.getModelInstance();
        Object.assign(newClient, model);
        return newClient;
    }
    parseArray(models: T[]): T[] {
        let modelsNew: T[] = [];
        for (let client of models) {
            modelsNew.push(this.parseObject(client));
        }
        return modelsNew;
    }
    parsePaged(res: Paged<T>): Paged<T> {
        let result: Paged<T> = new Paged<T>();
        result.paging = res.paging;
        result.paging.pageNumber--;
        result.items = this.parseArray(res.items);
        return result;
    }
}