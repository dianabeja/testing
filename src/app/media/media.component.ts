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

  media_size: any;
  media_hours: any;

  constructor(
    public dataServiceSize: DataService,
    public dataServiceHours: DataService2
  ) {}

  ngOnInit(): void {
    this.obtenerMediaSize();
    this.obtenerMediaHours();
  }

  obtenerMediaSize() {
    return this.dataServiceSize.getSize().subscribe((data: any) => {
      this.numbers_size = data.data;
      this.media_size = this.getMedia(...this.numbers_size);
    });
  }

  obtenerMediaHours(): number | any {
    return this.dataServiceHours.getMedia().subscribe((data: any) => {
      this.numbers_hours = data.data;
      this.media_hours = this.getMedia(...this.numbers_hours);
    });
  }

  getMedia(...numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b, 0);
    return +(sum / numbers.length).toFixed(2);
  }
}
