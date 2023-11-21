import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpsonComponent } from './simpson.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('SimpsonComponent', () => {
  let component: SimpsonComponent;
  let fixture: ComponentFixture<SimpsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpsonComponent],
      imports:[FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SimpsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return p=16.0 if x0=0, x1=4, num_seg=4, ERROR=0.0001 and f(x)=2x', () => {
    const resultado = component.simpson('2x', 0, 4, 4, 0.0001,0.0001);
    expect(resultado).toBe(16);
  });

  it('Should return p=0.3333 if x0=0, x1=1, num_seg=4, ERROR=0.0001 and f(x)=x^2', () => {
    const resultado = component.simpson('x*x', 0, 1, 4, 0.0001, 0.0001);
    expect(resultado).toBe(0.33333);
  });

  it('Should return p=1.38 if x0=1, x1=4, num_seg=6, ERROR=0.001 and f(x)=1/x', () => {
    const resultado = component.simpson('1/x', 1, 1, 6, 0.0001, 0.0001);
    expect(resultado).toBe(1);
  });

  it('Should return p = 0.35006 if X = 1.1, num_seg = 10 and Dof = 9', () => {
    const result = component.simpson('t', 0, 1.1, 10, 9, 0.0001);
    expect(result).toBe(0.35006);
  });

  it('Should return p = 0.35006 if X = 1.1, num_seg = 10 and Dof = 9', () => {
    const result = component.simpson('t', 0, 1.1812, 10, 10, 0.0001);
    expect(result).toBe(0.36757);
  });

  it('Should return p = 0.35006 if X = 1.1, num_seg = 10 and Dof = 9', () => {
    const result = component.simpson('t', 0, 2.75, 10, 30, 0.0001);
    expect(result).toBe(0.495);
  });
  it('should set Mostrar_Pantalla to true', () => {
    expect(component.Mostrar_Pantalla).toBeFalsy(); 
    component.Ocultar();
    expect(component.Mostrar_Pantalla).toBeTruthy(); 
  });

  //pruebas de integración
  //boton calcular
  it('should stddev when i click the stddev button ', () => {
    const result = component.simpson('t', 0, 2.75, 10, 30, 0.0001);
    let mediabutton = fixture.debugElement.query(By.css('.boton_calcular'));
    mediabutton.triggerEventHandler('click', null);
    expect(result).toBe(0.495);
  });
  //input_f
  it('should update "f" when an option is selected', () => {
    const selectElement = fixture.nativeElement.querySelector('select');
    selectElement.value = '2x';
    selectElement.dispatchEvent(new Event('change'));
    expect(component.f).toBe('2x');
  });
  //input_x0
  it("Should set x0 model through ngModel", async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('input[name="Input_x0"]')
    ).nativeElement;
    inputElement.value = "3.1416";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.x0).toEqual(3.1416);
  });
  //input_x1
  it("Should set x1 model through ngModel", async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('input[name="Input_x1"]')
    ).nativeElement;
    inputElement.value = "2.71";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.x1).toEqual(2.71);
  });
  //input_num_seg
  it("Should set x1 model through ngModel", async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('input[name="Input_num_seg"]')
    ).nativeElement;
    inputElement.value = "2.71";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.num_seg).toEqual(2.71);
  });
  //input_dof
  it("Should set x1 model through ngModel", async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('input[name="Input_dof"]')
    ).nativeElement;
    inputElement.value = "2.71";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.dof).toEqual(2.71);
  });
  //input_error
  it("Should set x1 model through ngModel", async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('input[name="Input_error"]')
    ).nativeElement;
    inputElement.value = "2.71";
    inputElement.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.error).toEqual(2.71);
  });
  //result
    it('Should render result div', () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css('.result'));
      let el: HTMLElement = de.nativeElement;
      expect(el.innerText).toContain('');
    });
});
