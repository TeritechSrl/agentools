import { Injectable } from '@angular/core';
import { ClientService } from './clients.service';
import { Observable } from 'rxjs';

@Injectable()
export class FileUploaderService {
    //file upload event  
    constructor(private _clientService: ClientService) {

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