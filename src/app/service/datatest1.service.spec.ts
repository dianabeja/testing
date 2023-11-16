import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestService } from './datatest1.service';
import { HttpClient } from '@angular/common/http';

describe('DataService', () => {
  let service: TestService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestService],
    });
    service = TestBed.inject(TestService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberá hacer una petición HTTP a la URL correcta', () => {
    const url = 'https://apicv-service-dianabeja.cloud.okteto.net/test1';
    service.getTest1().subscribe((data) => {
      expect(data).not.toBeNull();
      expect(data).toBeDefined();
    });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush({}); 
  });
  it('deberá hacer una petición HTTP a la URL correcta', () => {
    const url = 'https://apicv-service-dianabeja.cloud.okteto.net/test2';
    service.getTest2().subscribe((data) => {
      expect(data).not.toBeNull();
      expect(data).toBeDefined();
    });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush({}); 
  });
  it('deberá hacer una petición HTTP a la URL correcta', () => {
    const url = 'https://apicv-service-dianabeja.cloud.okteto.net/test3';
    service.getTest3().subscribe((data) => {
      expect(data).not.toBeNull();
      expect(data).toBeDefined();
    });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush({}); 
  });
  it('deberá hacer una petición HTTP a la URL correcta', () => {
    const url = 'https://apicv-service-dianabeja.cloud.okteto.net/test4';
    service.getTest4().subscribe((data) => {
      expect(data).not.toBeNull();
      expect(data).toBeDefined();
    });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush({}); 
  });
  
});