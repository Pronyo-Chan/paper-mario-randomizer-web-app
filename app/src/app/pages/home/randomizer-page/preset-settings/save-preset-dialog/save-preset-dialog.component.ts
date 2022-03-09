import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-preset-dialog',
  templateUrl: './save-preset-dialog.component.html',
  styleUrls: ['./save-preset-dialog.component.scss']
})
export class SavePresetDialogComponent {

  public newPresetName: string;
  public isPresetValid: boolean = true;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public presetNames: string[],
    private _dialogRef: MatDialogRef<SavePresetDialogComponent>
  ) {}

  public onSave(): void {
    this._dialogRef.close(this.newPresetName);
  }

  public onCancelClick(): void {
    this._dialogRef.close();
  }

  public validatePresetName() {
     if(this.presetNames.find(name => name == this.newPresetName)) {
      this.isPresetValid = false;
    } else {
      this.isPresetValid = true;
    }
  }
}