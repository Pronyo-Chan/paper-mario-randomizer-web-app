import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatcherRepository {

  private _rootURL = '/api';
  public constructor(private _httpClient: HttpClient) {    
  }

  public patch(fileToUpload: File): Observable<Blob> {
    const formData: FormData = new FormData();
    formData.append('inputRom', fileToUpload, fileToUpload.name);
    return this._httpClient.post(this._rootURL + '/patch', formData, {responseType: 'blob'}).pipe(timeout(300000));
  }
}
