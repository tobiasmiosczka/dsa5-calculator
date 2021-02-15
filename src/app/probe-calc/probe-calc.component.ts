import { Component, OnInit } from '@angular/core';
import { Qs } from '../model/qs';
import { QsProbabilities } from '../model/QsProbabilities';
import { Probes } from '../probes';

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
      '#5AA454',]};

  d: QsProbabilities;
  data: any[] = [];

  ngOnInit(): void {
    this.uptdateProbabilities();
  }

  uptdateProbabilities(): void {
    this.d = Probes.getProbabilities(this.fw, this.mod, this.value1, this.value2, this.value3);
    this.data = [
      {name: this.getString(0), value: this.d.criticalMiss },
      {name: this.getString(1), value: this.d.miss },
      {name: this.getString(2), value: this.d.qs1 },
      {name: this.getString(3), value: this.d.qs2 },
      {name: this.getString(4), value: this.d.qs3 },
      {name: this.getString(5), value: this.d.qs4 },
      {name: this.getString(6), value: this.d.qs5 },
      {name: this.getString(7), value: this.d.qs6 },
      {name: this.getString(8), value: this.d.criticalSuccess }];
  }

  private getString(qs: Qs): string {
    switch (qs) {
      case Qs.CRITICAL_MISS: return "Kritischer Patzer";
      case Qs.MISS: return "Patzer";
      case Qs.QS1: return "Qualitätsstufe 1";
      case Qs.QS2: return "Qualitätsstufe 2";
      case Qs.QS3: return "Qualitätsstufe 3";
      case Qs.QS4: return "Qualitätsstufe 4";
      case Qs.QS5: return "Qualitätsstufe 5";
      case Qs.QS6: return "Qualitätsstufe 6";
      case Qs.CRITICAL_HIT: return "Kritischer Erfolg";      
    }
  }

  probe(): void {
    this.w1 = Math.floor(Math.random() * 20) + 1;
    this.w2 = Math.floor(Math.random() * 20) + 1;
    this.w3 = Math.floor(Math.random() * 20) + 1;
    this.result = this.getString(Probes.getResult(this.w1, this.w2, this.w3, this.value1, this.value2, this.value3, this.fw, this.mod));
  }
}
