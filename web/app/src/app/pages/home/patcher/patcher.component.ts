import { PatcherRepository } from './../../../repositories/patcher-repository/patcher.repository';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {tap, take} from 'rxjs/operators'

@Component({
  selector: 'app-patcher',
  templateUrl: './patcher.component.html',
  styleUrls: ['./patcher.component.scss']
})
export class PatcherComponent implements OnInit {

  public patchingStatus: string;
  public constructor(private _patcherRepo: PatcherRepository) { }

  public ngOnInit(): void {

    this.patchingStatus = 'Click patch to apply StarRod mod'
  }

  public patch() {
    this.patchingStatus = 'patching in progress'
    this._patcherRepo.patch()
    .pipe(
      take(1),
      tap(file => {
        this.patchingStatus = 'Patching done!';
        var blob = new Blob([file], { type: '' });
        const data = window.URL.createObjectURL(blob);

        var link = document.createElement('a');
        link.href = data;
        link.download = 'Paper Mario.z64';
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      })
    ).subscribe();
  }

}
