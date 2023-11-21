import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LinearRegressionComponent, yk } from '../linear-regression/linear-regression.component';
import { CorrelationComponent } from './correlation.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


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
      imports: [HttpClientModule, HttpClientTestingModule, FormsModule],
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

  it('Should return r=0.9545 with the dataset Data_Test1', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test1.proxy_size,
      component.datos_Api_Test1.actual_added
    );

    expect(r).toBeCloseTo(0.9545, 4);
  })

  it('Should return rr=0.9111 with the dataset Data_Test1', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test1.proxy_size,
      component.datos_Api_Test1.actual_added
    );

    let rr = component.rr(r);
    expect(rr).toBeCloseTo(0.9111, 4);

  })

  it('Should return r=0.9333 with the dataset Data_Test2', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test2.proxy_size,
      component.datos_Api_Test2.actual_develop
    );

    expect(r).toBeCloseTo(0.9333, 4);

  })

  it('Should return rr=0.8711 with the dataset Data_Test2', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test2.proxy_size,
      component.datos_Api_Test2.actual_develop
    );

    let rr = component.rr(r);

    expect(rr).toBeCloseTo(0.8711, 4);

  })

  it('Should return r=0.9631 with the dataset Data_Test3', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test3.plan_added,
      component.datos_Api_Test3.actual_added
    );

    expect(r).toBeCloseTo(0.9631, 4);

  })

  it('Should return rr=0.9276. with the dataset Data_Test3', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test3.plan_added,
      component.datos_Api_Test3.actual_added
    );

    let rr = component.rr(r);

    expect(rr).toBeCloseTo(0.9276, 4);

  })

  it('Should return r=0.9480 with the dataset Data_Test4', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test4.proxy_added,
      component.datos_Api_Test4.actual_develop
    );

    expect(r).toBeCloseTo(0.9480, 4);

  })

  it('Should return rr=0.8988 with the dataset Data_Test4', () => {

    let r = component.FormulaCorrelacion(
      component.datos_Api_Test4.proxy_added,
      component.datos_Api_Test4.actual_develop
    );

    let rr = component.rr(r);

    expect(rr).toBeCloseTo(0.8988, 4);

  })

  it('should set Mostrar_Pantalla to true', () => {
    expect(component.Mostrar_Pantalla).toBeFalsy(); 
    component.Ocultar();
    expect(component.Mostrar_Pantalla).toBeTruthy(); 
  });

  it('cambiarEstadoBoton1 cambia el estado correctamente', () => {
    component.cambiarEstadoBoton1();
    expect(component.botonActivo1).toBe(true);
    expect(component.botonActivo2).toBe(false);
    expect(component.botonActivo3).toBe(false);
    expect(component.botonActivo4).toBe(false);
  });

  it('cambiarEstadoBoton2 cambia el estado correctamente', () => {
    component.cambiarEstadoBoton2();
    expect(component.botonActivo2).toBe(true);
    expect(component.botonActivo1).toBe(false);
    expect(component.botonActivo3).toBe(false);
    expect(component.botonActivo4).toBe(false);
  });

  it('cambiarEstadoBoton3 cambia el estado correctamente', () => {
    component.cambiarEstadoBoton3();
    expect(component.botonActivo3).toBe(true);
    expect(component.botonActivo2).toBe(false);
    expect(component.botonActivo1).toBe(false);
    expect(component.botonActivo4).toBe(false);
  });

  it('cambiarEstadoBoton4 cambia el estado correctamente', () => {
    component.cambiarEstadoBoton4();
    expect(component.botonActivo4).toBe(true);
    expect(component.botonActivo1).toBe(false);
    expect(component.botonActivo3).toBe(false);
    expect(component.botonActivo2).toBe(false);
  });


  it('regresion actualiza correctamente los valores', () => {
    let r = component.regresion(
      component.datos_Api_Test3.actual_added,
      component.datos_Api_Test3.plan_added,
    );
    component.x=386;
    expect(component.b0).toBeCloseTo(-23.9239, 4);
  });
  
  //pruebas de integración
  //boton test1
  it('should test1 when i click the hours button ', () => {
    let mediabutton = fixture.debugElement.query(By.css('.boton_test1'));
    mediabutton.triggerEventHandler('click', null);

    expect(component.datos_Api_Test1).toBeDefined()
    expect(component.datos_Api_Test1.proxy_size).toBeDefined()
    expect(component.datos_Api_Test1.actual_added).toBeDefined()
    expect(component.array_elegido.dato1).toBeDefined()
    expect(component.array_elegido.dato2).toBeDefined()
  });
  //boton test2
  it('should test2 when i click the test2 button ', () => {
    let mediabutton = fixture.debugElement.query(By.css('.boton_test2'));
    mediabutton.triggerEventHandler('click', null);
    expect(component.array_elegido.dato1).toBeDefined()
    expect(component.array_elegido.dato2).toBeDefined()
  });
  //boton test3
  it('should test3 when i click the test3 button ', () => {
    let mediabutton = fixture.debugElement.query(By.css('.boton_test3'));
    mediabutton.triggerEventHandler('click', null);
    expect(component.array_elegido.dato1).toBeDefined()
    expect(component.array_elegido.dato2).toBeDefined()
  });
  //boton test4
  it('should test4 when i click the test4 button ', () => {
    let mediabutton = fixture.debugElement.query(By.css('.boton_test4'));
    mediabutton.triggerEventHandler('click', null);
    expect(component.array_elegido.dato1).toBeDefined()
    expect(component.array_elegido.dato2).toBeDefined()
  });
  //boton regresionlineal
  it('should regresion when i click the regresion button ', () => {
      component.regresion(
        component.datos_Api_Test4.actual_develop,
      component.datos_Api_Test4.proxy_added,
    );
    component.x=386
    let regresion = fixture.debugElement.query(By.css('.boton_regresion'));
    regresion.triggerEventHandler('click', null);
    expect(component.b0).toBe(-4.6037);
    expect(component.b1).toBe(0.1402);
    expect(component.yk).toBe(49.4994);

  });
  //boton correlacion
  it('should correlacion when i click the correlacion button ', () => {
    component.FormulaCorrelacion(
      component.datos_Api_Test4.actual_develop,
    component.datos_Api_Test4.proxy_added,
  );
  let correlacion = fixture.debugElement.query(By.css('.boton_correlacion'));
  correlacion.triggerEventHandler('click', null);
  expect(component.resultR).toBe(0.9480);
  expect(component.resultRR).toBe(0.8987);
});
  //imputx
  it("Should set x0 model through ngModel", async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('input[name="Input_x"]')
    ).nativeElement;
    inputElement.value = "3.1416";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.x).toEqual(3.1416);
  });
  //result b0
  it('Should render result div', () => {
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.result_b0'));
    let el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('');
  });
  //result b1
  it('Should render result div', () => {
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.result_b1'));
    let el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('');
  });
  //result yk
  it('Should render result div', () => {
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.result_yk'));
    let el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('');
  });
  //result r
  it('Should render result div', () => {
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.result_r'));
    let el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('');
  });
  //result rr
  it('Should render result div', () => {
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.result_rr'));
    let el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('');
  });
});