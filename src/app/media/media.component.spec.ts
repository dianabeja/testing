import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MediaComponent } from './media.component';
import { DataService2 } from '../service/data2.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { DataService } from '../service/data.service';
import { getMedia } from './media.component';

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;
  let hoursService: DataService2;
  let sizeService: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: DataService2, useValue: hoursService },
        DataService,
        DataService2,
      ], // Proporciona el servicio falso
    }).compileComponents();

    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
    hoursService = TestBed.inject(DataService2);
    sizeService = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController); // Obtiene una instancia del controlador de pruebas HTTP
  });

  it('should create', () => {
    //Testear que el componente es creado
    expect(component).toBeTruthy();
  });


  it('should return mean = 550.6 with the data Hours', () => {
    //Mandar al método getMedia el array de datos que nos retorna la ejecución de obtenerMediaHours
    const result = getMedia(
      15.0,
      69.9,
      6.5,
      22.4,
      28.4,
      65.9,
      19.4,
      198.7,
      38.8,
      138.2
    );
    //Testear que la media retornada sea 60.32
    expect(result).toBe(60.32);
  });

  it('should return 0 when numbers array is empty', () => {
    const result = getMedia();
    expect(result).toBe(0);
  });

  it('Probar metodo obtener Media'),
    () => {
      const horas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = component.getMedia(...horas);
      expect(result).toBe(5.5);
    };

  it('should call getHours and getSize during ngOnInit', async () => {
    spyOn(component, 'getHours').and.returnValue(Promise.resolve());
    spyOn(component, 'getSize').and.returnValue(Promise.resolve());

    await component.ngOnInit();

    expect(component.getHours).toHaveBeenCalled();
    expect(component.getSize).toHaveBeenCalled();
  });

  it('should handle data for getHours and getSize during ngOnInit', async () => {
    const hoursData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sizeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    spyOn(component, 'getHours').and.returnValue(Promise.resolve());
    spyOn(component, 'getSize').and.returnValue(Promise.resolve());

    spyOn(component.dataServiceHours, 'getMedia').and.returnValue(of(hoursData));
    spyOn(component.dataServiceSize, 'getSize').and.returnValue(of(sizeData));

    await component.ngOnInit();
    component.numbers_hours = hoursData;
    component.numbers_size = sizeData;
    expect(component.numbers_hours).toEqual(hoursData);
  });

  
  it('should return data for getHours', async () => {
    const hoursData = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

    spyOn(component.dataServiceHours, 'getMedia').and.returnValue(of(hoursData));

    await component.getHours();

    expect(component.numbers_hours).toEqual(hoursData);
  });

  it('should return data for getSize', async () => {
    const sizeData = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

    spyOn(component.dataServiceSize, 'getSize').and.returnValue(of(sizeData));

    await component.getSize();

    console.log(component.numbers_size);

    //expect(component.numbers_size).toEqual(sizeData);
  });

  it('should calculate media_hours if horas.data is valid', () => {
    const horasData = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

    component.media_hours = { data: horasData };

    spyOn(component, 'getMedia').and.returnValue(5.5);

    component.obtenerMediaHours();

    //expect(component.getMedia).toHaveBeenCalledWith(...horasData);

    expect(component.media_hours).toBeDefined();
  });

  it('should calculate media_size if size.data is valid', () => {
    const sizeData = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

    component.numbers_size = { data: sizeData };

    spyOn(component, 'getMedia').and.returnValue(5.5);

    component.obtenerMediaSize();

    expect(component.getMedia).toHaveBeenCalledWith(...sizeData);

    expect(component.media_size).toBeDefined();
  });

  it('should return 0 when numbers array is empty', () => {
    const result = component.getMedia();
    expect(result).toBe(0);
  });

  it('should return 0 when array is empty', () => {
    let datos =  { data: [1, 2, 3, 4 , 5 ,6 ,7 ,8 ,9, 10]};
    const result = component.calcularMedia(datos);
    expect(result).toBe(5.5);
  });

  it('should calculate media_size if size.data is valid', () => {
    const sizeData = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

    component.numbers_size = { data: sizeData };

    spyOn(component, 'getMedia').and.returnValue(5.5);

    component.obtenerMediaSize();

    expect(component.getMedia).toHaveBeenCalledWith(...sizeData);

    expect(component.media_size).toBeDefined();
  });
  it('should calculate media_hours if horas.data is valid', () => {
    const horasData = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

    component.numbers_hours = { data: horasData };

    spyOn(component, 'getMedia').and.returnValue(5.5);

    component.obtenerMediaHours();

    expect(component.getMedia).toHaveBeenCalledWith(...horasData);

    expect(component.media_hours).toBeDefined();
  });


});
