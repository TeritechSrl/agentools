export interface ParserToModel<T>{

    parseObject(model:T);
    parseArray(clients: T[]): T[];
}