import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import glitchesJson from '../../../../utilities/glitches.json'
import { LogicGlitch } from 'src/app/entities/logicGlitch';

@Component({
  selector: 'app-glitches-and-tricks',
  templateUrl: './glitches-and-tricks.component.html',
  styleUrls: ['./glitches-and-tricks.component.scss']
})
export class GlitchesAndTricksComponent implements OnInit {

  @Input() public formGroup: FormGroup

  public glitchesList: LogicGlitch[];

  public constructor() { }

  public ngOnInit(): void {
    this.glitchesList = glitchesJson
    console.log(this.glitchesList)
  }

}
