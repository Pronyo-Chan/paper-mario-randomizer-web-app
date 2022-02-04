import { SettingsResponse } from './../../entities/settingsResponse';
import { SettingsRequest } from './../../entities/settingsRequest';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RandomizerRepository {

  private _rootURL = '/api';
  public constructor(private _httpClient: HttpClient) {    
  }

  public getStarRodPatch(modVersion: number): Observable<Blob> {
    return this._httpClient.get(`assets/starrod_${modVersion}.bps`, { responseType: 'blob' }).pipe(take(1))
  }

  public sendRandoSettings(request: SettingsRequest): Observable<string> {
    return this._httpClient.post(`${environment.apiEndPoint}randomizer_settings/`, request, {responseType: 'text'}).pipe(take(1));
  }

  public getSeedInfo(seedId: string): Observable<SettingsResponse> {
    return this._httpClient.get(`${environment.apiEndPoint}randomizer_settings/${seedId}`, { responseType: 'json' }).pipe(
      take(1),
      timeout(30000),
      map(response => response as SettingsResponse)
    )
  }

  public getRandoPatch(seedId: string): Observable<Blob> {
    return this._httpClient.get(`${environment.apiEndPoint}patch/${seedId}`, { responseType: 'blob' }).pipe(take(1), timeout(30000))
  }

  public getSpoilerLog(seedId: string): Observable<Blob> {
    return this._httpClient.get(`${environment.apiEndPoint}spoiler/${seedId}`, { responseType: 'blob' }).pipe(take(1), timeout(30000))
  }
}
