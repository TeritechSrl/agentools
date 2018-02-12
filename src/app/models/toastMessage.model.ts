export class ToastMessage{
    public type:ToastType;
    public messageText:string;

    constructor(text:string, msgType:ToastType){
        this.type = msgType;
        this.messageText = text;
    }
}

export enum ToastType{
    Ok,
    Error,
    Info,
    Warning
}