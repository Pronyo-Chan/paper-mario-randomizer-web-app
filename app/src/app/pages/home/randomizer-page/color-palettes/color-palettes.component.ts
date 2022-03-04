import { Constants } from './../../../../utilities/constants';
import { MarioSprite } from './../../../../entities/enum/marioSprite';
import { GoombarioSprite } from './../../../../entities/enum/goombarioSprite';
import { KooperSprite } from './../../../../entities/enum/kooperSprite';
import { CharacterSpriteSetting } from './../../../../entities/characterSpriteSetting';
import { BowSprite } from './../../../../entities/enum/bowSprite';
import { SpriteSetting } from './../../../../entities/enum/spriteSetting';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-color-palettes',
  templateUrl: './color-palettes.component.html',
  styleUrls: ['./color-palettes.component.scss']
})
export class ColorPalettesComponent implements OnInit, OnDestroy {

  @Input() public colorPalettesFormGroup: FormGroup;

  private _colorPalettesSubscription: any;

  public marioOptions = Constants.MARIO_OPTIONS
  public goombarioOptions = Constants.GOOMBARIO_OPTIONS
  public kooperOptions = Constants.KOOPER_OPTIONS
  public bowOptions = Constants.BOW_OPTIONS

  public constructor() { }
  

  public ngOnInit(): void {
    this.initComplexFormControls();
    this._colorPalettesSubscription = this.colorPalettesFormGroup.valueChanges.pipe(
      tap(() => this.initComplexFormControls())
    ).subscribe()
  }

  public ngOnDestroy(): void {
    if(this._colorPalettesSubscription)
      this._colorPalettesSubscription.unsubscribe();
  }

  public initComplexFormControls() {
    this.initSpriteFormControl('marioSprite', this.marioOptions);
    this.initSpriteFormControl('goombarioSprite', this.goombarioOptions);
    this.initSpriteFormControl('kooperSprite', this.kooperOptions);
    this.initSpriteFormControl('bowSprite', this.bowOptions);
  }

  public initSpriteFormControl(formControlName: string, spriteOptions: CharacterSpriteSetting[]) {
    this.colorPalettesFormGroup.get(formControlName).setValue(spriteOptions.find(o => o.optionDisplay == this.colorPalettesFormGroup.get(formControlName).value?.optionDisplay), { emitEvent: false });
  }

}
