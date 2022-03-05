import { Injectable, Inject } from '@angular/core';
import { StorageService } from './storage.service';

/**
 * Local storage service
 * used for persist application data in observable key value pair
 */
 @Injectable({
    providedIn: 'root'
})
export class LocalStorageService extends StorageService {

    constructor() {
        super(window.localStorage);
    }
}