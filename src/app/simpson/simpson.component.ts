import { fx_1eX } from '../simpson_rules';
import { fx_2x } from '../simpson_rules';
import { fx_XxX } from '../simpson_rules';
import { Component, OnInit } from '@angular/core';
import {t} from '../t/t'

@Component({
  selector: 'app-simpson',
  templateUrl: './simpson.component.html',
  styleUrls: ['./simpson.component.css'],
})
export class SimpsonComponent {
  constructor() {}
  public Mostrar_Pantalla: boolean = false;
  f="";
  x0=0;
  x1=0;
  num_seg=0;
  dof=0
  error=0
  result=0;

  Ocultar() {
    this.Mostrar_Pantalla = true;
  }

  simpson(f: string, x0: number, x1: number, num_seg: number, dof: any, error:number) {

      let E = error;
      let x = 0;
      let xC: any;
      let y;
      let area_seg;
      let P = 0;
      let PF;
      let contador = 0;
      const arrP = [];
      let margenE = 1;

      do {
        margenE = 0;
        let W = (x1 - x0) / num_seg;
        let W3 = W / 3;
        x = x0;
        for (let i = 0; i <= num_seg; i++) {
          if (f.toLowerCase() == '2x') {
            xC = fx_2x(x);
          } else if (f.toLowerCase() == 'x*x') {
            xC = fx_XxX(x);
          } else if (f.toLowerCase() == '1/x') {
            xC = fx_1eX(x);
          } else if(f.toLowerCase() == 't') {
            PF = t(dof,num_seg,x1);
            this.result=PF
            return PF
          }

          if (i == 0 || i == num_seg) {
            y = xC * 1;
          } else {
            i % 2! == 0 ? (y = xC * 2) : (y = xC * 4);
          }
          area_seg = y * W3;
          P += area_seg;

          x += W;
        }
        arrP.push(P);
        num_seg = num_seg * 2;
        contador += 1;
        if (contador > 0) {
          margenE = arrP[0] - arrP[contador];
        }
        PF = parseFloat(P.toFixed(5));
        P = 0;
      } while (margenE > E || contador < 2);

      if (PF == 0) {
        PF = 1;
      }
      this.result=PF
      return PF;
  }
}
