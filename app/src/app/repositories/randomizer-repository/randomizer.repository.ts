import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, map, take } from 'rxjs/operators';
import { withCache } from '@ngneat/cashew';
import { CosmeticsRequest } from 'src/app/entities/cosmeticsRequest';
import { SeedViewModel } from 'src/app/entities/seed-view-model/seedViewModel';
import { SeedGenerationRequest } from 'src/app/entities/seedGenerationRequest';

@Injectable({
  providedIn: 'root'
})
export class RandomizerRepository {

  public constructor(private _httpClient: HttpClient) {
  }

  public getStarRodPatch(modVersion: number, useProdPatch: boolean): Observable<Blob> {
    const modFileNamePrefix = useProdPatch ? "starrod_" : "starrod_debug_"
    return this._httpClient.get(`assets/${modFileNamePrefix}${modVersion}.bps`, { responseType: 'blob' }).pipe(take(1))
  }

  public sendRandoSettings(request: SeedGenerationRequest): Observable<string> {
    return this._httpClient.post(`${environment.apiEndPoint}randomizer_settings`, request, {responseType: 'text'}).pipe(take(1));
  }

  public getSeedInfo(seedId: string): Observable<SeedViewModel> {
    return this._httpClient.get(`${environment.apiEndPoint}randomizer_settings_v2/${seedId}`, { responseType: 'json', context: withCache() }).pipe(
      take(1),
      timeout(30000),
      map(response => response as SeedViewModel)
    )
  }

  public getRandoPatch(seedId: string): Observable<Blob> {
    return this._httpClient.get(`${environment.apiEndPoint}patch/${seedId}`, { responseType: 'blob', context: withCache() }).pipe(take(1), timeout(30000))
  }

  public getCosmeticsPatch(request: CosmeticsRequest): Observable<Blob> {
    return this._httpClient.post(`${environment.apiEndPoint}cosmetics_patch`, request, { responseType: 'blob' }).pipe(take(1), timeout(30000))
  }

  public getSpoilerLog(seedId: string): Observable<Blob> {
    return this._httpClient.get(`${environment.apiEndPoint}spoiler/${seedId}`, { responseType: 'blob', context: withCache() }).pipe(take(1), timeout(30000))
  }
}
