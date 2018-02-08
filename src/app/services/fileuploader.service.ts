import { Injectable } from '@angular/core';
import { ClientService } from './clients.service';

@Injectable()
export class FileUploaderService {
    //file upload event  
    constructor(private _clientService: ClientService) {

    }
    uploadFile() { }
    public avatarChange(event, clientId: number) {
        this._clientService.saveAvatar(clientId, this.fileFromEvent(event))
            .subscribe(
            data => console.log('success'),
            error => console.log(error)
            )
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