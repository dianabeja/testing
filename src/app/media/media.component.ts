import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { DataService2 } from '../service/data2.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent implements OnInit {
  numbers_size: any = [];
  numbers_hours: any[] | any;

  media_size: any ;
  media_hours: any;

  constructor(
    public dataServiceSize: DataService,
    public dataServiceHours: DataService2
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getHours();
    await this.getSize();
    this.obtenerMediaHours();
    this.obtenerMediaSize();
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

  async obtenerMediaSize() {
    if (this.numbers_size && this.numbers_size && Array.isArray(this.numbers_size)) {
      this.media_size = this.getMedia(...this.numbers_size);
    } else {
      console.log('No hay datos disponibles para calcular la media de size.');
    }
  }

  async obtenerMediaHours() {
    if (this.numbers_hours && this.numbers_hours && Array.isArray(this.numbers_hours)) {
      this.media_hours = this.getMedia(...this.numbers_hours);
      console.log(this.media_hours)
    } else {
      console.log('No hay datos disponibles para calcular la media de horas.');
    }
    return this.media_hours;
  }

  getMedia(...numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b, 0);
    return +(sum / numbers.length).toFixed(2);
  }
}

export function getMedia(...numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b, 0);
  return +(sum / numbers.length).toFixed(2);
}
