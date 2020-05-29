import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatcherRepository {

  private _rootURL = '/api';
  public constructor(private _httpClient: HttpClient) {    
  }

  public patch(): Observable<object> {
    return this._httpClient.get(this._rootURL + '/patch');
  }
}
