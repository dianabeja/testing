import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/datatest1.service';
@Component({
  selector: 'app-linear-regression',
  templateUrl: './linear-regression.component.html',
  styleUrls: ['./linear-regression.component.css'],
})
export class LinearRegressionComponent {
  constructor(public testService: TestService) {}

  //private datos_Api_Test1: any;
  //private datos_Api_Test2: any;
  //private datos_Api_Test3: any;
  //private datos_Api_Test4: any;
//
  //LlenarDatos() {
  //  this.datos_Api_Test1 = this.testService.getTest1();
  //  this.datos_Api_Test2 = this.testService.getTest2();
  //  this.datos_Api_Test3 = this.testService.getTest3();
  //  this.datos_Api_Test4 = this.testService.getTest4();
  //}

  ngOnInit(): void {
  }

  

  sum(data: number[]): number {
    return data.reduce((acc, value) => acc + value, 0);
  }

  sumXY(x: number[], y: number[]): number {
    return this.sum(x.map((value, index) => value * y[index]));
  }

  sumX(x: number[]): number {
    return this.sum(x);
  }

  sumYY(y: number[]): number {
    return this.sum(y.map((value) => value * value));
  }

  B1(x: number[], y: number[]): number {
    const N = x.length;
    return (
      (N * this.sumXY(x, y) - this.sumX(x) * this.sum(y)) /
      (N * this.sumYY(x) - Math.pow(this.sumX(x), 2))
    );
  }

  B0(x: number[], y: number[]): number {
    return (this.sum(y) - this.B1(x, y) * this.sumX(x)) / x.length;
  }

  yk(x: number[], y: number[], xk: number): number {
    return this.B0(x, y) + this.B1(x, y) * xk;
  }
}