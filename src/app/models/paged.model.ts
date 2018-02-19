import { Paging } from "./paging.model";

export class Paged<T>{
    constructor(){
        this.paging = new Paging();
    }
    paging:Paging;
    items: Array<T>;
}