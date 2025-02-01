import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { SAVED_PLANDO_NAME_PREFIX, SAVED_PLANDO_NAMES_KEY } from "src/app/pages/plando-page/plando-save-load/plando-save-load.component";

@Component({
  selector: 'app-plandomizers',
  templateUrl: './plandomizers.component.html',
  styleUrls: ['./plandomizers.component.scss']
})
export class PlandomizersComponent implements OnInit {
  @Input() public formGroup: FormGroup;
  public savedPlandoNames: Set<String>;
  public selectedPlandoName: string;
  public loadStatus: string;

  public ngOnInit(): void {
    const storedNames = window.localStorage.getItem(SAVED_PLANDO_NAMES_KEY);
    this.savedPlandoNames = storedNames ? new Set(storedNames.split(',')) : new Set();
  }

  public onSavedPlandoSelect($event: InputEvent) {
    const plandoName = ($event.target as HTMLSelectElement).value;
    if (!plandoName) {
      this.formGroup.get('plandomizer').setValue(null);
      this.loadStatus = '';
    } else {
      const plandoSettings = localStorage.getItem(SAVED_PLANDO_NAME_PREFIX + plandoName);
      if (!plandoSettings) {
        this.savedPlandoNames.delete(plandoName);
        this.loadStatus = 'notFound';
      } else {
        const plandoFormObj = JSON.parse(plandoSettings)
        this.formGroup.get('plandomizer').setValue(plandoFormObj);
        this.selectedPlandoName = plandoName;
        this.loadStatus = 'loaded';
      }
    }
  }

}
