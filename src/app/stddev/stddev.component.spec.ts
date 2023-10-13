import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DataService2 } from '../service/data2.service';
import { DataService } from '../service/data.service';
import { StddevComponent } from './stddev.component';

describe('StddevComponent', () => {
  let component: StddevComponent;
  let fixture: ComponentFixture<StddevComponent>;
  let dataServiceMock: jasmine.SpyObj<DataService2>;
  let dataServiceMock2: jasmine.SpyObj<DataService>;


  beforeEach(async () => {
    dataServiceMock = jasmine.createSpyObj('DataService2', ['getMedia']);
    dataServiceMock2 = jasmine.createSpyObj('DataService', ['getSize']);


    await TestBed.configureTestingModule({
      declarations: [ StddevComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: DataService2, useValue: dataServiceMock },
        { provide: DataService, useValue: dataServiceMock2 },

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StddevComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    //Testear que el componente es creado
    expect(component).toBeTruthy();
  });


  it('Funcionamiento ObtenerStddevHours', () => {
    //Asegurarse que el método obtenerStddevHours existe realmente en media.component.ts
    const probar_componente = spyOn(component, 'obtenerStddevHours');
    component.obtenerStddevHours();
    //Testear que el método obtenerStddevHours es llamado para su ejecución
    expect(probar_componente).toHaveBeenCalled();
  });

  it('Funcionamiento ObtenerMediaSize', () => {
    //Asegurarse que el método obtenerMediaSize exista realmente en media.component.ts
    const probar_componente = spyOn(component, 'obtenerStddevSize');
    component.obtenerStddevSize();
    //Testear que el método obtenerMediaSize es llamado para su ejecución
    expect(probar_componente).toHaveBeenCalled();
  });

  it('should return mean = 550.6 with the data Size', () => {
    //Mandar al método getMedia el array de datos que nos retorna la ejecución de obtenerMediaSize
    const result= component.getStddev(   
      160, 
      591,
      114,
      229,
      230,
      270,
      128,
      1657,
      624,
      1503);
    //Testear que la media retornada sea 550.6
    expect(result).toBe(550.6)
  })

  it('should return mean = 550.6 with the data Hours', () => {
    //Mandar al método getMedia el array de datos que nos retorna la ejecución de obtenerStddevHours
    const result= component.getStddev(   
      15.0, 
      69.9, 
      6.5, 
      22.4, 
      28.4, 
      65.9, 
      19.4, 
      198.7, 
      38.8, 
      138.2);
    //Testear que la media retornada sea 60.32
    expect(result).toBe(60.32)
  })

  it('should set numbers_hours on successful getHours call', async () => {
    const testData = { data: [   15.0, 
      69.9, 
      6.5, 
      22.4, 
      28.4, 
      65.9, 
      19.4, 
      198.7, 
      38.8, 
      138.2] };
    dataServiceMock.getMedia.and.returnValue(of(testData));
  
    await component.getHours();
  
    expect(component.numbers_hours).toEqual(testData.data);
  });
  
  it('should set numbers_size on successful getSize call', async () => {
    const testData = { data: [     160, 
      591,
      114,
      229,
      230,
      270,
      128,
      1657,
      624,
      1503] };
    dataServiceMock2.getSize.and.returnValue(of(testData));
  
    await component.getSize();
  
    expect(component.numbers_size).toEqual(testData.data);
  });
  
});
