import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/datatest1.service';
import {
  sum,
  sumX,
  sumXX,
  sumXY,
  sumYY,B0,  B1,yk
} from '../linear-regression/linear-regression.component';

@Component({
  selector: 'app-correlation',
  templateUrl: './correlation.component.html',
  styleUrls: ['./correlation.component.css'],
})
export class CorrelationComponent implements OnInit {
  constructor(public testService: TestService) {}
  public Mostrar_Pantalla: boolean = false;
  public array_elegido: any = [];

  public resultR:number=0;
  public resultRR:number=0;
  x=0;
  b0=0;
  b1=0;
  yk=0;

  Ocultar() {
    this.Mostrar_Pantalla = true;
  }
  public datos_Api_Test1: any;
  public datos_Api_Test2: any;
  public datos_Api_Test3: any;
  public datos_Api_Test4: any;

  ngOnInit(): void {
    this.testService.getTest1().subscribe((data: any) => {
      this.datos_Api_Test1 = data;
    });
    this.testService.getTest2().subscribe((data: any) => {
      this.datos_Api_Test2 = data;
    });
    this.testService.getTest3().subscribe((data: any) => {
      this.datos_Api_Test3 = data;
    });
    this.testService.getTest4().subscribe((data: any) => {
      this.datos_Api_Test4 = data;
    });
    this.getTest1();
    this.getTest2();
    this.getTest3();
    this.getTest4();
  }

  async getTest1() {
    this.datos_Api_Test1=await this.testService.getTest1().toPromise();
    this.array_elegido.dato1=this.datos_Api_Test1.actual_added;
    this.array_elegido.dato2=this.datos_Api_Test1.proxy_size;
  }

  async getTest2() {
    this.datos_Api_Test2=await this.testService.getTest2().toPromise();
    this.array_elegido.dato1=this.datos_Api_Test2.actual_develop;
    this.array_elegido.dato2=this.datos_Api_Test2.proxy_size;
  }

  async getTest3() {
    this.datos_Api_Test3=await this.testService.getTest3().toPromise();
    this.array_elegido.dato1=this.datos_Api_Test3.actual_added;
    this.array_elegido.dato2=this.datos_Api_Test3.plan_added;
  }

  async getTest4() {
    this.datos_Api_Test4=await this.testService.getTest4().toPromise();
    this.array_elegido.dato1=this.datos_Api_Test4.actual_develop;
    this.array_elegido.dato2=this.datos_Api_Test4.proxy_added;
  }

  FormulaCorrelacion(x: number[], y: number[]): number {
    let n = x.length;

    let SumXY = sumXY(x, y);

    let SumY = sum(y);

    let SumX = sumX(x);

    let SumXX = sumXX(x);

    let SumYY = sumYY(y);

    let formula =
      (n * SumXY - SumX * SumY) /
      Math.sqrt(
        (n * SumXX - Math.pow(SumX, 2)) * (n * SumYY - Math.pow(SumY, 2))
      );
    this.resultR = parseFloat(formula.toFixed(4));

    return formula;
  }
  rr(r: number): number {
    let reusltrr= Math.pow(r, 2);
    this.resultRR = parseFloat(reusltrr.toFixed(4));
    return this.resultRR;
  }

  botonActivo1: boolean = false;
  botonActivo2: boolean = false;
  botonActivo3: boolean = false;
  botonActivo4: boolean = false;

  cambiarEstadoBoton1() {
    this.botonActivo1 = !this.botonActivo1;
    this.botonActivo2 = false;
    this.botonActivo3 = false;
    this.botonActivo4 = false;
  }

  cambiarEstadoBoton2() {
    this.botonActivo2 = !this.botonActivo2;
    this.botonActivo1 = false;
    this.botonActivo3 = false;
    this.botonActivo4 = false;
  }

  cambiarEstadoBoton3() {
    this.botonActivo3 = !this.botonActivo1;
    this.botonActivo2 = false;
    this.botonActivo1 = false;
    this.botonActivo4 = false;
  }

  cambiarEstadoBoton4() {
    this.botonActivo4 = !this.botonActivo2;
    this.botonActivo1 = false;
    this.botonActivo3 = false;
    this.botonActivo2 = false;
  }
  regresion(x: number[], y: number[]) : number {
    let b0 = 1;
    b0 = B0(y, x);
    this.b0 = parseFloat(b0.toFixed(4));
    let b1 = 1;
    b1 = B1(y, x);
    this.b1 = parseFloat(b1.toFixed(4));
    let yk = 1;
    yk = b0+b1*this.x
    this.yk = parseFloat(yk.toFixed(4));
    return yk
  }
}
