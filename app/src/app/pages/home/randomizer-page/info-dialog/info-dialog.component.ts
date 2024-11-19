import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {

  public constructor(private _router: Router, private _dialogRef: MatDialogRef<InfoDialogComponent>) {}

  public onChangelogClick(): void {
    this._dialogRef.close();
  }
}
