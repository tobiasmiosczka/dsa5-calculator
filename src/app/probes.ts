import { Qs } from "./model/qs";
import { QsProbabilities } from "./model/QsProbabilities";

export class Probes {

    public static getProbabilities(fw: number, mod: number, val1: number, val2: number, val3: number): QsProbabilities {
        let result: QsProbabilities = {criticalMiss: (58.0 / 8000.0), miss: 0, qs1: 0, qs2: 0, qs3: 0, qs4: 0, qs5: 0, qs6: 0, criticalSuccess: (58.0 / 8000.0)};
        let qsProbs: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let a = 1; a <= 20; ++a) 
          for (let b = 1; b <= 20; ++b) 
            for (let c = 1; c <= 20; ++c) 
              ++qsProbs[Probes.getResult(a, b, c, val1, val2, val3, fw, mod)];
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

    public static getResult(w1: number, w2: number, w3: number, val1: number, val2: number, val3: number, fw: number, mod: number): Qs {
        if ((w1 == 20 && w2 == 20) || (w2 == 20 && w3 == 20) || (w1 == 20 && w3 == 20)) 
          return Qs.CRITICAL_MISS; //kritischer patzer
        if ((w1 == 1 && w2 == 1) || (w2 == 1 && w3 == 1) || (w1 == 1 && w3 == 1)) 
          return Qs.CRITICAL_HIT; //kritischer erfolg
        let remainingFw = fw;
        if (w1 > val1 + mod) 
          remainingFw -= w1 - mod - val1;
        if (w2 > val2 + mod) 
          remainingFw -= w2 - mod - val2;
        if (w3 > val3 + mod) 
          remainingFw -= w3 - mod - val3;
        return Probes.getQs(remainingFw);
      }
    
      public static getQs(fp: number): Qs {
        if (fp > 15) return Qs.QS6;
        if (fp > 12) return Qs.QS5;
        if (fp >  9) return Qs.QS4;
        if (fp >  6) return Qs.QS3;
        if (fp >  3) return Qs.QS2;
        if (fp >  0) return Qs.QS1;
        return Qs.MISS;
      }
}