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

  public array_elegido: any;
  public resultado = 0;

  async ngOnInit(): Promise<void> {
    await this.getHours();
    await this.getSize();
    this.obtenerMediaHours();
  }

  async getHours() {
    return new Promise<void>((resolve, reject) => {
      this.dataServiceHours.gethours().subscribe((data: any[]) => {
        this.numbers_hours = data;
        this.array_elegido = data;
        resolve();
      });
    });
  }

  async getSize() {
    return new Promise<void>((resolve, reject) => {
      this.dataServiceSize.getSize().subscribe((data: any[]) => {
        this.numbers_hours = data;
        this.array_elegido = data;
        resolve();
      });
    });
  }

  async obtenerMediaHours() {
    if (this.numbers_hours && this.numbers_hours.data && Array.isArray(this.numbers_hours.data)) {
      this.media_hours = this.getMedia(...this.numbers_hours.data);
    }
  }

  async obtenerMediaSize() {
    if (this.numbers_size && this.numbers_size.data && Array.isArray(this.numbers_size.data)) {
      this.media_size = this.getMedia(...this.numbers_size.data);
    }
  }

  getMedia(...numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b, 0);
    return +(sum / numbers.length).toFixed(2);
  }

  calcularMedia(array: number[] | any) {
    const result = this.getMedia(...array.data);
    this.resultado = result;
    return result;
  }
  }
  export function getMedia(...numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b, 0);
  return +(sum / numbers.length).toFixed(2);
}