import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { DataService2 } from '../service/data2.service';
import { MediaComponent } from '../media/media.component';

@Component({
  selector: 'app-stddev',
  templateUrl: './stddev.component.html',
  styleUrls: ['./stddev.component.css']
})
export class StddevComponent implements OnInit {
  numbers_size: any = [];
  numbers_hours: any[] | any;
  desviacion_size: any; 
  desviacion_hours: any;
  media_hours:any =this.mediaComponent.media_hours;
  media_size:any =this.mediaComponent.media_size;
  constructor(
    public dataServiceSize: DataService,
    public dataServiceHours: DataService2,
    public mediaComponent :MediaComponent
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getHours();
    await this.getSize();
    this.obtenerStddevHours();
    this.obtenerStddevSize();
  }

  async getHours() {
    return new Promise<void>((resolve, reject) => {
      this.dataServiceHours.getMedia().subscribe(
        (data: any) => {
          this.numbers_hours = data.data;
          resolve();
        },
        (error) => {
          console.error('Error al obtener los datos de horas:', error);
          reject(error);
        }
      );
    });
  }

  async getSize() {
    return new Promise<void>((resolve, reject) => {
      this.dataServiceSize.getSize().subscribe(
        (data: any) => {
          this.numbers_size = data.data;
          resolve();
        },
        (error) => {
          console.error('Error al obtener los datos de size:', error);
          reject(error);
        }
      );
    });
  }

  async obtenerStddevSize() {
    if (this.numbers_size && this.numbers_size.data && Array.isArray(this.numbers_size.data)) {
      const media = this.media_size(...this.numbers_size.data);
      this.desviacion_size = this.getStddev(this.numbers_size.data, media);
      console.log(this.desviacion_size);
    } else {
      console.log('No hay datos disponibles para calcular la desviación estándar de size.');
    }
  }

  async obtenerStddevHours() {
    if (this.numbers_hours && this.numbers_hours.data && Array.isArray(this.numbers_hours.data)) {
      const media = this.media_hours(...this.numbers_hours.data);
      this.desviacion_hours = this.getStddev(this.numbers_hours.data, media);
      console.log(this.desviacion_hours);
    } else {
      console.log('No hay datos disponibles para calcular la desviación estándar de horas.');
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
    return +(desviacion.toFixed(2));
}
}