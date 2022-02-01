import { SettingsRequest } from './../../entities/settingsRequest';
import { environment } from '../../../environments/environment';
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

  public getStarRodPatch(): Observable<Blob> {
    return this._httpClient.get('assets/starrod.bps', { responseType: 'blob' })
  }

  public sendRandoSettings(request: SettingsRequest): Observable<string> {
    return this._httpClient.post(environment.apiEndPoint + 'randomizer_settings/', request, {responseType: 'text'});
  }

  public getRandoPatch(seedId: string): Observable<Blob> {
    return this._httpClient.get(environment.apiEndPoint +'patch/' + seedId, { responseType: 'blob' }).pipe(timeout(30000))
  }

  public getSpoilerLog(seedId: string): Observable<Blob> {
    return this._httpClient.get(environment.apiEndPoint +'spoiler/' + seedId, { responseType: 'blob' }).pipe(timeout(30000))
  }
}
