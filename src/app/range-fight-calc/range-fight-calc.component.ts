import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-range-fight-calc',
  templateUrl: './range-fight-calc.component.html',
  styleUrls: ['./range-fight-calc.component.scss']
})
export class RangeFightCalcComponent implements OnInit {

  ranges: any[] = [
    {value: +2, viewValue: 'Nah'},
    {value: +0, viewValue: 'Mittel'},
    {value: -2, viewValue: 'Fern'}
  ];

  sizes: any[] = [
    {value: -8, viewValue: 'winzig'},
    {value: -4, viewValue: 'klein'},
    {value: +0, viewValue: 'mittel'},
    {value: +4, viewValue: 'groß'},
    {value: +8, viewValue: 'riesig'}
  ];

  movementsEnemy: any[] = [
    {value: +2, viewValue: "steht still"},
    {value: +0, viewValue: "leichte Bewegung"},
    {value: -2, viewValue: "schnelle Bewegung"},
    {value: -4, viewValue: "schlägt Haken"}
  ];

  movementsSelf: any[] = [
    {value: +0, viewValue: "steht still"},
    {value: -2, viewValue: "leichte Bewegung"},
    {value: -4, viewValue: "schnelle Bewegung"}   
  ];

  sights :any[] = [
    {value: +0, viewValue: "klar"},
    {value: -2, viewValue: "leicht gestört"},
    {value: -4, viewValue: "Silhouette"},
    {value: -6, viewValue: "schemenhaft"},
    {value: -100, viewValue: "unsichtbar"}
  ];

  range: any = this.ranges[1];
  size: any = this.sizes[2];
  movementEnemy: any = this.movementsEnemy[1];
  movementSelf: any = this.movementsSelf[0];
  sight: any = this.sights[0];

  result: number;

  constructor() { }

  update(): void {
    this.result = 0
      + this.range.value
      + this.size.value
      + this.movementEnemy.value
      + this.movementSelf.value
      + this.sight.value;
  }

  ngOnInit(): void {
    this.update();
  }

}
