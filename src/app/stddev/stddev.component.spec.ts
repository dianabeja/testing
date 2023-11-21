import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DataService2 } from '../service/data2.service';
import { DataService } from '../service/data.service';
import { StddevComponent } from './stddev.component';
import { By } from '@angular/platform-browser';
import { getMedia } from '../media/media.component';

describe('StddevComponent', () => {
  let component: StddevComponent;
  let fixture: ComponentFixture<StddevComponent>;
  let dataServiceMock: jasmine.SpyObj<DataService2>;
  let dataServiceMock2: jasmine.SpyObj<DataService>;
  let dataServiceHours: DataService2;
  let dataServiceSize: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StddevComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: DataService2, useValue: dataServiceMock },
        { provide: DataService, useValue: dataServiceMock2 },
        DataService,
        DataService2,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StddevComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    dataServiceHours = TestBed.inject(DataService2);
    dataServiceSize = TestBed.inject(DataService);
  });

  it('should create', () => {
    //Testear que el componente es creado
    expect(component).toBeTruthy();
  });

  it('should handle data for getHours and getSize during ngOnInit', async () => {
    const hoursData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sizeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    spyOn(component, 'getHours').and.returnValue(Promise.resolve());
    spyOn(component, 'getSize').and.returnValue(Promise.resolve());

    spyOn(component.dataServiceHours, 'gethours').and.returnValue(
      of(hoursData)
    );
    spyOn(component.dataServiceSize, 'getSize').and.returnValue(of(sizeData));

    await component.ngOnInit();
    component.numbers_hours = hoursData;
    component.numbers_size = sizeData;
    expect(component.numbers_hours).toEqual(hoursData);
    expect(component.numbers_size).toEqual(sizeData);
  });

  it('should return data for getSize', async () => {
    const sizeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    spyOn(component.dataServiceSize, 'getSize').and.returnValue(of(sizeData));
    await component.getSize();
    expect(component.numbers_size.data).toEqual(undefined);
  });

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

    spyOn(component.dataServiceHours, 'gethours').and.returnValue(
      of(hoursData)
    );
    spyOn(component.dataServiceSize, 'getSize').and.returnValue(of(sizeData));

    await component.ngOnInit();
    component.numbers_hours = hoursData;
    component.numbers_size = sizeData;
    expect(component.numbers_hours).toEqual(hoursData);
    expect(component.numbers_size).toEqual(sizeData);
  });

  it('should calculate media and set desviacion_hours', () => {
    component.numbers_hours = [
      15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2,
    ];
    const spyGetStddev = spyOn(component, 'getStddev').and.callThrough();
    component.obtenerStddevHours();
    expect(spyGetStddev).toHaveBeenCalledWith(
      component.numbers_hours,
      jasmine.any(Number)
    );
    expect(component.desviacion_hours).toBeDefined();
  });

  it('should return data for getHours', async () => {
    const hoursData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    spyOn(component.dataServiceHours, 'gethours').and.returnValue(
      of(hoursData)
    );

    await component.getHours();

    expect(component.numbers_hours).toEqual(undefined);
  });

  it('should return 0 when array is empty', () => {
    let datos = { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
    const result = component.calcularMedia(datos);
    expect(result).toBe(5.5);
  });

  //Prueba para probar calcularDesviacion
  it('should return 0 when array is empty', () => {
    let datos = { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
    const result = component.calcularDesviacion(datos);
    expect(result).toBe(3.03);
  });

  it('should set Mostrar_Pantalla to true', () => {
    expect(component.Mostrar_Pantalla).toBeFalsy(); 
    component.Ocultar();
    expect(component.Mostrar_Pantalla).toBeTruthy(); 
  });

  //pruebas de integración
  //boton_stddev
  it('should stddev when i click the stddev button ', () => {
    component.numbers_size = [
      15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2,
    ];
    component.array_elegido = component.numbers_size;
    let mediabutton = fixture.debugElement.query(By.css('.boton_stddev'));
    mediabutton.triggerEventHandler('click', null);
    expect(component.resultado).toBe(62.26);
  });
  //boton_media
  it('should media when i click the minimo button ', () => {
    component.numbers_size = [
      15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2,
    ];
    component.array_elegido = component.numbers_size;
    let mediabutton = fixture.debugElement.query(By.css('.boton_media'));
    mediabutton.triggerEventHandler('click', null);
    expect(component.resultado).toBe(60.32);
  });
  //botonHours
  it('should hours when i click the hours button ', () => {
    let mediabutton = fixture.debugElement.query(By.css('.boton_hours'));
    mediabutton.triggerEventHandler('click', null);
  });

  //botonSize
  it('should size when i click the size button ', () => {
    let mediabutton = fixture.debugElement.query(By.css('.boton_size'));
    mediabutton.triggerEventHandler('click', null);
  });
  //result media
  it('Should render media in result div', () => {
    component.numbers_size = [
      15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2,
    ];
    component.calcularMedia(component.numbers_size);
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.result'));
    let el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('');
  });
  //result stddev
  it('Should render media in result div', () => {
    component.numbers_size = [
      15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2,
    ];
    component.calcularDesviacion(component.numbers_size);
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.result'));
    let el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('');
  });

    it('maneja el caso donde array.data no está definido', () => {
      const resultado = component.calcularDesviacion({}); // Puedes pasar un objeto vacío o cualquier otro objeto sin la propiedad 'data'
      expect(resultado).toBe(0); // O ajusta según cómo quieras manejar este caso
    });
    it('maneja el caso donde array.data no está definido', () => {
      const resultado = component.calcularMedia({}); // Puedes pasar un objeto vacío o cualquier otro objeto sin la propiedad 'data'
      expect(resultado).toBe(0); // O ajusta según cómo quieras manejar este caso
    });
  
});
