import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataService2 } from './data2.service';
import { HttpClient } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService2;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService2],
    });
    service = TestBed.inject(DataService2);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberá hacer una petición HTTP a la URL correcta', () => {
    //Url de la api a la que se va a mandar a llamar
    const url = 'https://apicv-service-dianabeja.cloud.okteto.net/hours';
    //Se verifica que la variable data no esté vacia al llamado de la api
    service.gethours().subscribe((data) => {
      expect(data).not.toBeNull();
      expect(data).toBeDefined();
    });
    //Creacion de la variable que hará la simulación de petición a Api
    const req = httpTestingController.expectOne(url);
    //Testing del llamado a la Api, esperando que retorne con exito una petición de tipo GET
    expect(req.request.method).toEqual('GET');
    req.flush({}); // Esto simula una respuesta del servidor
  });

  //Limpiar el cache para realizar otra petición limpia.
  afterEach(() => {
    httpTestingController.verify();
  });
  
});