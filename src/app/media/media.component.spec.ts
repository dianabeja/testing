import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MediaComponent } from './media.component';
import { DataService2 } from '../service/data2.service';
import { DataService } from '../service/data.service';

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;
  let dataservice2: DataService2;
  let dataservice: DataService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ MediaComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [DataService2, DataService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
    dataservice2 = TestBed.inject(DataService2);
    dataservice = TestBed.inject(DataService);
  });

  it('Probar que el metodo mediaSize esté funcionando', () => {
    //Simulacion de la ejecución del método obtenerMediaSize que llamará al servicio DataService
    const mediaSizeSpy = spyOn(component, 'obtenerMediaSize');
    //Simular apertura del componente media.component.ts 
    fixture.detectChanges();
    //Testear que el metodo es mandado a traer 
    expect(mediaSizeSpy).toHaveBeenCalled();
  });

  it('Probar que el metodo mediaHours esté funcionando', () => {
    //Simulacion de la ejecución del método obtenerMediaHours que llamará al servicio DataService2
    const mediaHoursSpy = spyOn(component, 'obtenerMediaHours');
    //Simular apertura del componente media.component.ts 
    fixture.detectChanges();
    //Testear que el metodo es mandado a traer 
    expect(mediaHoursSpy).toHaveBeenCalled();
  });
  


  it('should create', () => {
    //Testear que el componente es creado
    expect(component).toBeTruthy();
  });


  it('Funcionamiento ObtenerMediaHours', () => {
    //Asegurarse que el método obtenerMediaHours existe realmente en media.component.ts
    const probar_componente = spyOn(component, 'obtenerMediaHours');
    component.obtenerMediaHours();
    //Testear que el método obtenerMediaHours es llamado para su ejecución
    expect(probar_componente).toHaveBeenCalled();
  });

  it('Funcionamiento ObtenerMediaSize', () => {
    //Asegurarse que el método obtenerMediaSize exista realmente en media.component.ts
    const probar_componente = spyOn(component, 'obtenerMediaSize');
    component.obtenerMediaSize();
    //Testear que el método obtenerMediaSize es llamado para su ejecución
    expect(probar_componente).toHaveBeenCalled();
  });

  it('should return mean = 550.6 with the data Size', () => {
    //Mandar al método getMedia el array de datos que nos retorna la ejecución de obtenerMediaSize
    const result= component.getMedia(   
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
    //Mandar al método getMedia el array de datos que nos retorna la ejecución de obtenerMediaHours
    const result= component.getMedia(   
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

  it('Retorno correcto al llamado de Api Hours', () => {
    //Simulación de lo que la Api retornará al hacer el método Get del Array Hours
    let array:any = [
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
    ]

    //Variable para guardar lo obtenido del llamado de la Api
    let datos_obtenidos: any;

    //Crear una variable para ejecutar una "simulación" con spyOn de la ejecución de la llamada al servicio, en su método getMedia. Ademas, el data:Array es una simulacion
    //de lo que retorna el api
    const servicio = spyOn(dataservice2, 'getMedia').and.returnValue(of({ data: array }));

    //Se ejecuta el método de llamada a la Api para la obtención del array de datos y poder llenar las variables (numbers_hours)
    component.obtenerMediaHours();
    component.dataServiceHours.getMedia().subscribe((data) => datos_obtenidos = data.data)

    //Testeo de que el llamado al servicio es ejecutado correctamente
    expect(servicio).toHaveBeenCalled();

    //Testear de que la variable media_hours coincide con la ejecución del método GetMedia, pasandole el parameto de los datos obtenidos por el servicio
    expect(component.media_hours).toEqual(component.getMedia(...datos_obtenidos));

    //Ejecutar el método GetMedia 
    const result= component.getMedia( ...datos_obtenidos  );
    //Testear que la media obtenida sea la esperada en el documento A1
    expect(result).toBe(60.32)

    //Testear que los datos obtenidos sean iguales a los esperados
    expect(datos_obtenidos).toBe(array)
  })

  it('Retorno correcto al llamado de Api Size', () => {
    //Simulación de lo que la Api retornará al hacer el método Get del Array Size
    let array:any = [
      160, 
      591,
      114,
      229,
      230,
      270,
      128,
      1657,
      624,
      1503
    ]

    //Variable para guardar lo obtenido del llamado de la Api
    let datos_obtenidos: any;

    //Crear una variable para ejecutar una "simulación" con spyOn de la ejecución de la llamada al servicio, en su método getMedia. Ademas, el data:Array es una simulacion
    //de lo que retorna el api
    const servicio = spyOn(dataservice, 'getSize').and.returnValue(of({ data: array }));

    //Se ejecuta el método de llamada a la Api para la obtención del array de datos y poder llenar las variables (numbers_hours)
    component.obtenerMediaSize();
    component.dataServiceSize.getSize().subscribe((data) => datos_obtenidos = data.data)

    //Testeo de que el llamado al servicio es ejecutado correctamente
    expect(servicio).toHaveBeenCalled();

    //Testear de que la variable media_hours coincide con la ejecución del método GetMedia, pasandole el parameto de los datos obtenidos por el servicio
    expect(component.media_size).toEqual(component.getMedia(...datos_obtenidos));

    //Ejecutar el método GetMedia 
    const result= component.getMedia( ...datos_obtenidos  );
    //Testear que la media obtenida sea la esperada en el documento A1
    expect(result).toBe(550.6)

    //Testear que los datos obtenidos sean iguales a los esperados
    expect(datos_obtenidos).toBe(array)
  })
  
});
