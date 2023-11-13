import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LinearRegressionComponent } from '../linear-regression/linear-regression.component';
import { CorrelationComponent } from './correlation.component';

import { TestService } from '../service/datatest1.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';


describe('CorrelationComponent', () => {
  let component: CorrelationComponent;
  let componentLinear: LinearRegressionComponent;
  let fixture: ComponentFixture<CorrelationComponent>;
  let fixtureLinear: ComponentFixture<LinearRegressionComponent>;
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
      declarations: [CorrelationComponent, LinearRegressionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CorrelationComponent);
    fixtureLinear = TestBed.createComponent(LinearRegressionComponent);
    component = fixture.componentInstance;
    componentLinear = fixtureLinear.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('Should return r=0.9545 with the dataset Data_Test1', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test1.proxy_size,
      component.datos_Api_Test1.actual_added
    );

    console.log(r)
    expect(r).toBeCloseTo(0.9545, 4);
  })

  xit('Should return rr=0.9111 with the dataset Data_Test1', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test1.proxy_size,
      component.datos_Api_Test1.actual_added
    );

    let rr = component.rr(r);
    expect(rr).toBeCloseTo(0.9111, 4);

  })

  xit('Should return r=0.9333 with the dataset Data_Test2', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test2.proxy_size,
      component.datos_Api_Test2.actual_develop
    );

    expect(r).toBeCloseTo(0.9333, 4);

  })

  xit('Should return rr=0.8711 with the dataset Data_Test2', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test2.proxy_size,
      component.datos_Api_Test2.actual_develop
    );

    let rr = component.rr(r);

    expect(rr).toBeCloseTo(0.8711, 4);

  })

  xit('Should return r=0.9631 with the dataset Data_Test3', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test3.plan_added,
      component.datos_Api_Test3.actual_added
    );

    expect(r).toBeCloseTo(0.9631, 4);

  })

  xit('Should return rr=0.9276. with the dataset Data_Test3', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test3.plan_added,
      component.datos_Api_Test3.actual_added
    );

    let rr = component.rr(r);

    expect(rr).toBeCloseTo(0.9276, 4);

  })

  xit('Should return r=0.9480 with the dataset Data_Test4', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test4.proxy_added,
      component.datos_Api_Test4.actual_develop
    );

    expect(r).toBeCloseTo(0.9480, 4);

  })

  xit('Should return rr=0.8988 with the dataset Data_Test4', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test4.proxy_added,
      component.datos_Api_Test4.actual_develop
    );

    let rr = component.rr(r);

    expect(rr).toBeCloseTo(0.8988, 4);

  })

});