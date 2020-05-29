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

  public patch(): Observable<Blob> {
    return this._httpClient.get(this._rootURL + '/patch', {responseType: 'blob'}).pipe(timeout(30000));
  }
}
