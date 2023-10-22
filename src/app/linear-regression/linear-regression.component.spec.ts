import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LinearRegressionComponent } from './linear-regression.component';
import { TestService } from '../service/datatest1.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('LinearRegressionComponent', () => {
  let component: LinearRegressionComponent;
  let fixture: ComponentFixture<LinearRegressionComponent>;
  let mockTestService: jasmine.SpyObj<TestService>;


  beforeEach(async () => {

    mockTestService = jasmine.createSpyObj('TestService', ['getTest1', 'getTest2', 'getTest3', 'getTest4']);
    const datosTest = {
      proxy_size: [130, 650, 99, 150, 128, 302, 95, 945, 368, 961],
      actual_added: [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601],
    };

    const datosTest2 = {
      proxy_size: [130, 650, 99, 150, 128, 302, 95, 945, 368, 961],
      actual_develop: [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2],
    };

    const datosTest3 = {
      plan_added: [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130],
      actual_added: [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601],
    };

    const datosTest4 = {
      proxy_added: [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130],
      actual_develop: [
        15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2,
      ],
    };

    mockTestService.getTest1.and.returnValue(of(datosTest));
    mockTestService.getTest2.and.returnValue(of(datosTest2));
    mockTestService.getTest3.and.returnValue(of(datosTest3));
    mockTestService.getTest4.and.returnValue(of(datosTest4));
    

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        { provide: TestService, useValue: mockTestService }
      ],
      declarations: [LinearRegressionComponent],
    }).compileComponents();
    
    fixture = TestBed.createComponent(LinearRegressionComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return B0=-22.55 with the dataset Data_Test1', () => {
    const B0 = component.B0(
      component.datos_Api_Test1.proxy_size,
      component.datos_Api_Test1.actual_added
    );
    expect(B0).toBeCloseTo(-22.55, 2);
  });

  it('Should return B1=1.7279 with the dataset Data_Test1', async () => {
    const B1 = component.B1(
      component.datos_Api_Test1.proxy_size,
      component.datos_Api_Test1.actual_added
    );
    expect(B1).toBeCloseTo(1.7279, 4);
  });

  it('Should return yk=644.429 with the dataset Data_Test1 if x=386', () =>{
    const yk = component.yk(
      component.datos_Api_Test1.proxy_size,
      component.datos_Api_Test1.actual_added,
      386
    );
    expect(yk).toBeCloseTo(644.429, 3);
  })

  it('Should return B0=-4.039 with the dataset Data_Test2', () =>{
    const B0 = component.B0(
      component.datos_Api_Test2.proxy_size,
      component.datos_Api_Test2.actual_develop
    );
    expect(B0).toBeCloseTo(-4.039, 3);
  })

  it('Should return B1=0.1681 with the dataset Data_Test2', () =>{
    const B1 = component.B1(
      component.datos_Api_Test2.proxy_size,
      component.datos_Api_Test2.actual_develop
    );
    expect(B1).toBeCloseTo(0.1681, 4);
  })

  it('Should return yk=60.858 with the dataset Data_Test2 if x=386', () =>{
    const yk = component.yk(
      component.datos_Api_Test2.proxy_size,
      component.datos_Api_Test2.actual_develop,
      386
    );
    expect(yk).toBeCloseTo(60.858, 3);
  })

  it('Should return B0=-23.92 with the dataset Data_Test3', () =>{
    const B0 = component.B0(
      component.datos_Api_Test3.plan_added,
      component.datos_Api_Test3.actual_added
    );
    expect(B0).toBeCloseTo(-23.92, 2);
  })

  it('Should return B1=1.43097 with the dataset Data_Test3  ', () =>{
    const B1 = component.B1(
      component.datos_Api_Test3.plan_added,
      component.datos_Api_Test3.actual_added
    );
    expect(B1).toBeCloseTo(1.43097, 5);
  })

  it('Should return yk=528.4294 with the dataset Data_Test3 if x=386  ', () =>{
    const yk = component.yk(
      component.datos_Api_Test3.plan_added,
      component.datos_Api_Test3.actual_added,
      386
    );
    expect(yk).toBeCloseTo(528.4294, 4);
  })

  it(' Should return B0=-4.604 with the dataset Data_Test4  ', () =>{
    const B0 = component.B0(
      component.datos_Api_Test4.proxy_added,
      component.datos_Api_Test4.actual_develop
    );
    expect(B0).toBeCloseTo(-4.604, 3);
  })

  it(' Should return B1=0.14016 with the dataset Data_Test4  ', () =>{
    const B1 = component.B1(
      component.datos_Api_Test4.proxy_added,
      component.datos_Api_Test4.actual_develop
    );
    expect(B1).toBeCloseTo(0.14016, 4);
  })

  it('Should return yk=49.4994 with the dataset Data_Test4 if x=386', () =>{
    const yk = component.yk(
      component.datos_Api_Test4.proxy_added,
      component.datos_Api_Test4.actual_develop,
      386
    );
    expect(yk).toBeCloseTo(49.4994, 4);
  })
});
