import { PatcherRepository } from './../../../repositories/patcher-repository/patcher.repository';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-patcher',
  templateUrl: './patcher.component.html',
  styleUrls: ['./patcher.component.scss']
})
export class PatcherComponent implements OnInit {

  public patchResult: Observable<object>;
  public constructor(private _patcherRepo: PatcherRepository) { }

  public ngOnInit(): void {
    this.patchResult = of(null);
  }

  public patch() {
    this.patchResult = this._patcherRepo.patch();
  }

}
