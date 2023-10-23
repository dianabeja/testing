import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/datatest1.service';
import { sum, sumX, sumXX, sumXY, sumYY } from '../linear-regression/linear-regression.component';

@Component({
  selector: 'app-correlation',
  templateUrl: './correlation.component.html',
  styleUrls: ['./correlation.component.css']
})
export class CorrelationComponent implements OnInit {

  constructor(public testService: TestService
    ) {}

  public datos_Api_Test1: any;
  public datos_Api_Test2: any;
  public datos_Api_Test3: any;
  public datos_Api_Test4: any;

  ngOnInit(): void {
   this.testService.getTest1().subscribe((data: any) => {

      this.datos_Api_Test1 = data;
    })
    this.testService.getTest2().subscribe((data: any) => {

      this.datos_Api_Test2 = data;
    })
    this.testService.getTest3().subscribe((data: any) => {

      this.datos_Api_Test3 = data;
    })
    this.testService.getTest4().subscribe((data: any) => {

      this.datos_Api_Test4 = data;
    })
  }

  FormulaCorrelacion(x: number[], y: number[]): number {
    let n = x.length;

    let SumXY = sumXY(x, y);

    let SumY = sum(y);

    let SumX = sumX(x);

    let SumXX = sumXX(x);

    let SumYY = sumYY(y);

    let formula = (n * SumXY - SumX * SumY) / Math.sqrt((n * SumXX - Math.pow(SumX, 2)) * (n * SumYY - Math.pow(SumY, 2)));
    return formula;
  }
  rr (r: number): number {
    return Math.pow(r, 2);
  }

}
