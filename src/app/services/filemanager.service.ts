import { Injectable } from '@angular/core';
import { ClientService } from './clients.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/Rx' ;
import {saveAs as importedSaveAs} from "file-saver";

@Injectable()
export class FileManagerService {
    //file upload event  
    constructor(private _clientService: ClientService,
        protected http: HttpClient) {

    }
    public export(action: string) {
        this.http.get<Response>("Exporter/" + action + "?lang=es", {responseType: 'blob' as 'json' })
            .subscribe(res => this.downloadFile(res));
    }
    public avatarChange(event, clientId: number) {
        return this._clientService.saveAvatar(clientId, this.fileFromEvent(event));
    }
    public fileToUrl(event: any): Observable<string> {
        let observable: Observable<string> = new Observable<string>(observer => {
            let fileList: FileList = event.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                var reader = new FileReader();

                reader.onload = function (e) {
                    observer.next(reader.result);
                    observer.complete();
                }

                reader.readAsDataURL(file);
            } else {
                observer.error('No hay archivos para cargar.');
            }
        });

        return observable;
    }
    downloadFile(data: Response) {
        var blob = new Blob([data], { type: 'application/vnd.ms-excel' });

        importedSaveAs(blob, 'ExportCliente.xlsx');

        /*
        var url = window.URL.createObjectURL(blob);
        window.open(url);
        */
    }
    private fileFromEvent(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);

            return formData;
        }
    }
}