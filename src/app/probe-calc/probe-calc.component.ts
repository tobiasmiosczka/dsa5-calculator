import { Component, OnInit } from '@angular/core';
import { QsProbabilities } from '../model/QsProbabilities';

declare function runGenScene(): any;
declare var google: any;

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

  data: QsProbabilities = {criticalMiss: (58.0 / 8000.0), miss: 0, qs1: 0, qs2: 0, qs3: 0, qs4: 0, qs5: 0, qs6: 0, criticalSuccess: (58.0 / 8000.0)};

  googleLoaded: boolean = false;

  ngOnInit(): void {
    this.uptdateProbabilities();
    if (runGenScene) {
      runGenScene();
    } else {
      console.error('Scene not found');
    }
  }

  uptdateProbabilities(): void {
    let d = this.getProbability(this.fw, this.mod, this.value1, this.value2, this.value3);
    this.data.criticalMiss = d.criticalMiss;
    this.data.criticalSuccess = d.criticalSuccess;
    this.data.miss = d.miss;
    this.data.qs1 = d.qs1;
    this.data.qs2 = d.qs2;
    this.data.qs3 = d.qs3;
    this.data.qs4 = d.qs4;
    this.data.qs5 = d.qs5;
    this.data.qs6 = d.qs6;
    this.updateChart();
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

  getDataTable(): any {
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'number', id: 'propability' });
    return dataTable;
  }

  private drawChart(){
    let dataTable = new google.visualization.arrayToDataTable([
      ['Ergebnis', 'Wahrscheinlichkeit [%]'],
      ['Krtitischer Patzer', this.data.criticalMiss],
      ['Patzer', this.data.miss],
      ['QS1', this.data.qs1],
      ['QS2', this.data.qs2],
      ['QS3', this.data.qs3],
      ['QS4', this.data.qs4],
      ['QS5', this.data.qs5],
      ['QS6', this.data.qs6],
      ['Kritischer Erfolg', this.data.criticalSuccess]
    ]);
    let container = document.getElementById('chart');
    if(container != null) {
      let chart = new google.charts.Bar(container);
      if (chart != null) {
        chart.draw(dataTable, 
          {
            tooltip: { 
              trigger: 'none' 
            }, 
            bars: 'horizontal',
            legend: {
              position: 'none'
            },
            hAxis: {
              format: 'percent'
            }
          });
      }
    } 
  }

  updateChart() {
    if(!this.googleLoaded) {
      google.charts.load('current', {'packages':['bar']});
      this.googleLoaded = true;
    }
    google.charts.setOnLoadCallback(() =>  this.drawChart());
  }
}
