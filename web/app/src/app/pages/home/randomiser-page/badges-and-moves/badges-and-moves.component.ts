import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-badges-and-moves',
  templateUrl: './badges-and-moves.component.html',
  styleUrls: ['./badges-and-moves.component.scss']
})
export class BadgesAndMovesComponent implements OnInit {

  @Input() public badgesAndMovesFormGroup: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
