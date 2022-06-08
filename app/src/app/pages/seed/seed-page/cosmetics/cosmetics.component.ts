import { SettingStringMappingService } from './../../../../services/setting-string-mapping/setting-string-mapping.service';
import { Constants } from '../../../../utilities/constants';
import { CharacterSpriteSetting } from '../../../../entities/characterSpriteSetting';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-cosmetics',
  templateUrl: './cosmetics.component.html',
  styleUrls: ['./cosmetics.component.scss']
})
export class CosmeticsComponent implements OnInit, OnDestroy {

  @Input() public cosmeticsFormGroup: FormGroup;
  @Input() public doLoadLatestSettings: boolean

  private _cosmeticsSubscription: any;

  public marioOptions = Constants.MARIO_OPTIONS;
  public goombarioOptions = Constants.GOOMBARIO_OPTIONS;
  public kooperOptions = Constants.KOOPER_OPTIONS;
  public parakarryOptions = Constants.PARAKARRY_OPTIONS;
  public bowOptions = Constants.BOW_OPTIONS;
  public wattOptions = Constants.WATT_OPTIONS;
  public sushieOptions = Constants.SUSHIE_OPTIONS;

  public constructor(private _mappingService: SettingStringMappingService) { }
  

  public ngOnInit(): void {
    this.initComplexFormControls();
    this._cosmeticsSubscription = this.cosmeticsFormGroup.valueChanges.pipe(
      tap(() => this.initComplexFormControls())
    ).subscribe()

    if(this.doLoadLatestSettings) {
      var cosmeticsSettings = JSON.parse(localStorage.getItem("cosmeticsSettings"));
      if(cosmeticsSettings) {
        try {
          this._mappingService.decompressFormGroup(cosmeticsSettings, this.cosmeticsFormGroup, this._mappingService.cosmeticsMap);
        } catch (error) {
        }
      }
    }
  }

  public ngOnDestroy(): void {
    if(this._cosmeticsSubscription)
      this._cosmeticsSubscription.unsubscribe();
  }

  public initComplexFormControls() {
    this.initSpriteFormControl('marioSprite', this.marioOptions);
    this.initSpriteFormControl('goombarioSprite', this.goombarioOptions);
    this.initSpriteFormControl('kooperSprite', this.kooperOptions);
    this.initSpriteFormControl('parakarrySprite', this.parakarryOptions);
    this.initSpriteFormControl('bowSprite', this.bowOptions);
    this.initSpriteFormControl('wattSprite', this.wattOptions);
    this.initSpriteFormControl('sushieSprite', this.sushieOptions);
  }

  public initSpriteFormControl(formControlName: string, spriteOptions: CharacterSpriteSetting[]) {
    if(this.cosmeticsFormGroup.get(formControlName).value?.optionDisplay) {
      this.cosmeticsFormGroup.get(formControlName).setValue(spriteOptions.find(o => o.optionDisplay == this.cosmeticsFormGroup.get(formControlName).value?.optionDisplay), { emitEvent: false });
    }
    else {
      this.cosmeticsFormGroup.get(formControlName).setValue(spriteOptions[0])
    }
  }

}
