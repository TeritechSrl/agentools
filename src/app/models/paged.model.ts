import { Paging } from "./paging.model";

export class Paged<T>{
    paging:Paging;
    items: Array<T>;
}