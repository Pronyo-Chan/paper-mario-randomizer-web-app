import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {

  public constructor(
    @Inject(MAT_DIALOG_DATA) public presetNames: string[],
    private _dialogRef: MatDialogRef<InfoDialogComponent>
  ) {}

  public onCancelClick(): void {
    this._dialogRef.close();
  }

}
