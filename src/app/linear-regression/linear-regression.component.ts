import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/datatest1.service';
@Component({
  selector: 'app-linear-regression',
  templateUrl: './linear-regression.component.html',
  styleUrls: ['./linear-regression.component.css'],
})
export class LinearRegressionComponent implements OnInit {
  constructor(public testService: TestService) {}

  public datos_Api_Test1: any;
  public datos_Api_Test2: any;
  public datos_Api_Test3: any;
  public datos_Api_Test4: any;
  
  ngOnInit(): void {
    console.log("Ingresa al ngOnit")
    this.testService.getTest1().subscribe((data: any) => {
      console.log("Ingresa al componente.Test1")
      this.datos_Api_Test1 = data;
    })
    this.testService.getTest2().subscribe((data: any) => {
      console.log("Ingresa al componente.Test2")
      this.datos_Api_Test2 = data;
    })
    this.testService.getTest3().subscribe((data: any) => {
      console.log("Ingresa al componente.Test3")
      this.datos_Api_Test3 = data;
    })
    this.testService.getTest4().subscribe((data: any) => {
      console.log("Ingresa al componente.Test4")
      this.datos_Api_Test4 = data;
    })
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

  async getObtenerTest1() {
  return new Promise<void>((resolve, reject) => {
    this.testService.getTest1().subscribe(
      (data: any) => {
        console.log(data)
        this.datos_Api_Test1 = data;
        resolve();
      },
      (error) => {
        console.error('Error al obtener los datos de horas:', error);
        reject(error);
      }
    );
  });
  }

  async getObtenerTest2() {
    return new Promise<void>((resolve, reject) => {
      this.testService.getTest2().subscribe(
        (data: any) => {
          console.log(data)
          this.datos_Api_Test2 = data;
          resolve();
        },
        (error) => {
          console.error('Error al obtener los datos de horas:', error);
          reject(error);
        }
      );
    });
    }

    async getObtenerTest3() {
      return new Promise<void>((resolve, reject) => {
        this.testService.getTest3().subscribe(
          (data: any) => {
            console.log(data)
            this.datos_Api_Test3 = data;
            resolve();
          },
          (error) => {
            console.error('Error al obtener los datos de horas:', error);
            reject(error);
          }
        );
      });
      }

      async getObtenerTest4() {
        return new Promise<void>((resolve, reject) => {
          this.testService.getTest4().subscribe(
            (data: any) => {
              console.log(data)
              this.datos_Api_Test4 = data;
              resolve();
            },
            (error) => {
              console.error('Error al obtener los datos de horas:', error);
              reject(error);
            }
          );
        });
        }

}

export function sum(data: number[]): number {
  return data.reduce((acc, value) => acc + value, 0);
}

export function sumXY(x: number[], y: number[]): number {
  return sum(x.map((value, index) => value * y[index]));
}

export function sumX(x: number[]): number {
  return sum(x);
}

export function sumYY(y: number[]): number {
  return sum(y.map((value) => value * value));
}

export function sumXX(x: number[]): number {
  return sum(x.map((value) => value * value));
}