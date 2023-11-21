import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { DataService2 } from '../service/data2.service';
import { getMedia } from '../media/media.component';

@Component({
  selector: 'app-stddev',
  templateUrl: './stddev.component.html',
  styleUrls: ['./stddev.component.css'],
})
export class StddevComponent implements OnInit {
  numbers_size: any[] | any = [];
  numbers_hours: any[] | any;
  desviacion_size: any;
  desviacion_hours: any;

  public resultado = 0;

  public Mostrar_Pantalla: boolean = false;
  public array_elegido: any = 0;

  Ocultar() {
    this.Mostrar_Pantalla = true;
  }

  constructor(
    public dataServiceSize: DataService,
    public dataServiceHours: DataService2
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getHours();
    await this.getSize();
    this.obtenerStddevHours();
    this.obtenerStddevSize();
    this.Mostrar_Pantalla = false;
  }

  async getHours() {
    this.array_elegido = await this.dataServiceHours.gethours().toPromise();
    this.array_elegido.data = this.array_elegido.horas;
    return new Promise<void>((resolve, reject) => {
      this.dataServiceHours.gethours().subscribe(
        (data: any) => {
          this.numbers_hours = data.horas;
          resolve();
        }
      );
    });
  }

  async getSize() {
    this.array_elegido = await this.dataServiceSize.getSize().toPromise();
    this.array_elegido.data = this.array_elegido.data;
    return new Promise<void>((resolve, reject) => {
      this.dataServiceSize.getSize().subscribe(
        (data: any) => {
          this.numbers_size.data = data.data;
          resolve();
        }
      );
    });
  }

  async obtenerStddevSize() {
    if (
      this.numbers_size &&
      this.numbers_size &&
      Array.isArray(this.numbers_size)
    ) {
      const media = getMedia(...this.numbers_size);
      this.desviacion_size = this.getStddev(this.numbers_size, media);
    } 
  }

  async obtenerStddevHours() {
    if (
      this.numbers_hours &&
      this.numbers_hours &&
      Array.isArray(this.numbers_hours)
    ) {
      const media = getMedia(...this.numbers_hours);
      this.desviacion_hours = this.getStddev(this.numbers_hours, media);
    } 
  }

  getStddev(arreglo: number[], media: number): number {
    let acumulador = 0;
    for (let i = 0; i < arreglo.length; i++) {
      const diferencia = arreglo[i] - media;
      acumulador += diferencia * diferencia;
    }

    const varianza = acumulador / (arreglo.length - 1);
    const desviacion = Math.sqrt(varianza);
    return +desviacion.toFixed(2);
  }

  calcularMedia(array: number[] | any) {
    const dataArray = Array.isArray(array) ? array : (array.data || []);

    const result = getMedia(...dataArray);
    this.resultado = result;
    return result;
  }

  calcularDesviacion(array: number[] | any) {
    const dataArray = Array.isArray(array) ? array : (array.data || []);

    const media = getMedia(...dataArray);
    const result = this.getStddev(dataArray, media);
    this.resultado = result;
    return result;
  }

  botonActivo1: boolean = false;
  botonActivo2: boolean = false;

  cambiarEstadoBoton1() {
    this.botonActivo1 = !this.botonActivo1;
    this.botonActivo2 = false;
  }

  cambiarEstadoBoton2() {
    this.botonActivo2 = !this.botonActivo2;
    this.botonActivo1 = false;
  }

}
