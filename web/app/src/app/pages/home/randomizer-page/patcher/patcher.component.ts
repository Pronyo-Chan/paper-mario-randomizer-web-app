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

  public fileToUpload: any = null;
  public patchFile: any = null;
  public constructor(private _patcherRepo: PatcherRepository) { }

  public ngOnInit(): void {
  }

  public patch() {
     this._patcherRepo.patch()
    .pipe(
      take(1),
      tap(patch => {
        console.log(this.fileToUpload)
        this.patchFile = new MarcFile(new File([patch], 'patch'), () => this.patchFileReadyCallback());
             
      })
    ).subscribe();
  }

  public handleFileInput(files: FileList) {
    this.fileToUpload = new MarcFile(files[0]);
  }

  public patchFileReadyCallback() {
    console.log('a')
    console.log(this.fileToUpload)
    console.log(this.patchFile)
    console.log('b')
    var bpsPatch = new parseBPSFile(this.patchFile);
    var result = new applyPatch(bpsPatch, this.fileToUpload);
  }

}
