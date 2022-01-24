import { Constants } from './../../../../utilities/constants';
import { PatcherRepository } from './../../../../repositories/patcher-repository/patcher.repository';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {tap, take} from 'rxjs/operators';
declare var applyPatch: any; 
declare var MarcFile: any; 
declare var parseBPSFile: any; 
declare var crc32: any;

  
@Component({
  selector: 'app-patcher',
  templateUrl: './patcher.component.html',
  styleUrls: ['./patcher.component.scss']
})
export class PatcherComponent implements OnInit {

  public userRom: any = null;
  public patchFile: any = null;
  public patchedRomBlob: Blob = null;

  public isRomValid = false;

  public constructor(private _patcherRepo: PatcherRepository) { }

  public ngOnInit(): void {
  }

  public patch() {
     this._patcherRepo.patch()
    .pipe(
      take(1),
      tap(patch => {
        console.log(this.userRom)
        this.patchFile = new MarcFile(new File([patch], 'patch'), () => this.patchFileReadyCallback());
             
      })
    ).subscribe();
  }

  public handleFileInput(files: FileList) {
    this.isRomValid = false;
    this.userRom = new MarcFile(files[0], () => this.romFileReadyCallback());
  }

  public patchFileReadyCallback() {
    var bpsPatch = new parseBPSFile(this.patchFile);
    this.patchedRomBlob = new applyPatch(bpsPatch, this.userRom);

    this.serveDownload(this.patchedRomBlob);

  }

  public romFileReadyCallback() {
    var checksum = crc32(this.userRom, 0, false);
    if (checksum == Constants.VALID_ROM_CRC) {
      this.isRomValid = true;
    }
  }

  public serveDownload(blob: Blob) {
    const data = window.URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = data;
    link.download = 'Paper Mario (patched).z64';
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  }

}
