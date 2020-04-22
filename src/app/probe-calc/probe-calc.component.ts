import { Component, OnInit } from '@angular/core';
import { QsProbabilities } from '../model/QsProbabilities';

@Component({
  selector: 'app-probe-calc',
  templateUrl: './probe-calc.component.html',
  styleUrls: ['./probe-calc.component.scss']
})
export class ProbeCalcComponent implements OnInit {
  value1: number = 10;
  value2: number = 10;
  value3: number = 10;
  fw: number = 0;
  mod: number = 0;

  w1: number;
  w2: number;
  w3: number;
  result: string;

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  colorScheme = {
    domain: [
      '#000', 
      '#A10A28', 
      '#5AA454', 
      '#5AA454',
      '#5AA454', 
      '#5AA454', 
      '#5AA454',
      '#5AA454', 
      '#5AA454',
    ]
  };

  d: QsProbabilities;
  data: any[] = [];

  ngOnInit(): void {
    this.uptdateProbabilities();
  }

  uptdateProbabilities(): void {
    this.d = this.getProbability(this.fw, this.mod, this.value1, this.value2, this.value3);
    this.data = [
      {name: this.getResultString(0), value: this.d.criticalMiss },
      {name: this.getResultString(1), value: this.d.miss },
      {name: this.getResultString(2), value: this.d.qs1 },
      {name: this.getResultString(3), value: this.d.qs2 },
      {name: this.getResultString(4), value: this.d.qs3 },
      {name: this.getResultString(5), value: this.d.qs4 },
      {name: this.getResultString(6), value: this.d.qs5 },
      {name: this.getResultString(7), value: this.d.qs6 },
      {name: this.getResultString(8), value: this.d.criticalSuccess }
    ];
  }

  min(a: number, b: number): number {
    return (a < b) ? a : b;
  }

  getProbability(fw: number, mod: number, val1: number, val2: number, val3: number): QsProbabilities {
    let result: QsProbabilities = {criticalMiss: (58.0 / 8000.0), miss: 0, qs1: 0, qs2: 0, qs3: 0, qs4: 0, qs5: 0, qs6: 0, criticalSuccess: (58.0 / 8000.0)};
    let qsProbs: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let a, b, c: number;
    for (a = 1; a <= 20; ++a) {
      for (b = 1; b <= 20; ++b) {
        for (c = 1; c <= 20; ++c) {
          ++qsProbs[this.getResult(a, b, c, val1, val2, val3, fw, mod)];
        }
      }
    }

    qsProbs[6] += qsProbs[7];
    qsProbs[5] += qsProbs[6];
    qsProbs[4] += qsProbs[5];
    qsProbs[3] += qsProbs[4];
    qsProbs[2] += qsProbs[3];
    
    result.criticalMiss = qsProbs[0] / 8000.0;
    result.miss = qsProbs[1] / 8000.0;
    result.qs1 = qsProbs[2] / 8000.0;
    result.qs2 = qsProbs[3] / 8000.0;
    result.qs3 = qsProbs[4] / 8000.0;
    result.qs4 = qsProbs[5] / 8000.0;
    result.qs5 = qsProbs[6] / 8000.0;
    result.qs6 = qsProbs[7] / 8000.0;
    result.criticalSuccess = qsProbs[8] / 8000.0;
    
    return result;
  }

  getResultString(result: number): string {
    switch (result) {
      case 0: return "Kritischer Patzer";
      case 1: return "Patzer";
      case 2: return "Qualitätsstufe 1";
      case 3: return "Qualitätsstufe 2";
      case 4: return "Qualitätsstufe 3";
      case 5: return "Qualitätsstufe 4";
      case 6: return "Qualitätsstufe 5";
      case 7: return "Qualitätsstufe 6";
      case 8: return "Kritischer Erfolg";      
    }
  }

  getResult(w1: number, w2: number, w3: number, val1: number, val2: number, val3: number, fw: number, mod: number) {
    if ((w1 == 20 && w2 == 20) || (w2 == 20 && w3 == 20) || (w1 == 20 && w3 == 20)) {
      return 0; //kritischer patzer
    }
    if ((w1 == 1 && w2 == 1) || (w2 == 1 && w3 == 1) || (w1 == 1 && w3 == 1)) {
      return 8; //kritischer erfolg
    }
    let remainingFw = fw;
    if (w1 > val1 + mod) 
      remainingFw -= w1 - mod - val1;
    if (w2 > val2 + mod) 
      remainingFw -= w2 - mod - val2;
    if (w3 > val3 + mod) 
      remainingFw -= w3 - mod - val3;
    return this.getQs(remainingFw) + 1;
  }

  getQs(remainingFw: number): number {
    if (remainingFw < 0 ) return 0;
    if (remainingFw < 4 ) return 1;
    if (remainingFw < 7 ) return 2;
    if (remainingFw < 10 ) return 3;
    if (remainingFw < 13 ) return 4;
    if (remainingFw < 16 ) return 5;
    return 6;
  }

  probe(): void {
    this.w1 = Math.floor(Math.random() * 20) + 1;
    this.w2 = Math.floor(Math.random() * 20) + 1;
    this.w3 = Math.floor(Math.random() * 20) + 1;
    this.result = this.getResultString(this.getResult(this.w1, this.w2, this.w3, this.value1, this.value2, this.value3, this.fw, this.mod));
  }
}
