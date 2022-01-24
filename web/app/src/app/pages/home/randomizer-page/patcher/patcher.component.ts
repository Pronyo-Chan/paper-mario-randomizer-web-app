import { PatcherRepository } from './../../../../repositories/patcher-repository/patcher.repository';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {tap, take} from 'rxjs/operators';
declare var applyPatch: any; 
declare var MarcFile: any; 
declare var parseBPSFile: any; 

  
@Component({
  selector: 'app-patcher',
  templateUrl: './patcher.component.html',
  styleUrls: ['./patcher.component.scss']
})
export class PatcherComponent implements OnInit {

  public userRom: any = null;
  public patchFile: any = null;
  public patchedRomBlob: Blob = null;

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
    this.userRom = new MarcFile(files[0]);
  }

  public patchFileReadyCallback() {
    var bpsPatch = new parseBPSFile(this.patchFile);
    this.patchedRomBlob = new applyPatch(bpsPatch, this.userRom);

    this.serveDownload(this.patchedRomBlob);

  }

  public serveDownload(blob: Blob) {
    const data = window.URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = data;
    link.download = 'Paper Mario (patched).z64';
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  }

}
