import { SettingsRequest } from './../../entities/settingsRequest';
import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RandomizerRepository {

  private _rootURL = '/api';
  public constructor(private _httpClient: HttpClient) {    
  }

  public patch(): Observable<Blob> {
    //return this._httpClient.post(this._rootURL + '/patch', formData, {responseType: 'blob'}).pipe(timeout(300000));
    return this._httpClient.get('assets/OWPM_alpha_ISpy.bps', { responseType: 'blob' })
  }

  public sendRandoSettings(request: SettingsRequest): Observable<string> {
    return this._httpClient.post(environment.apiEndPoint + 'randomizer_settings/', request).pipe(
      map(response => response.toString())
    );
  }
}
