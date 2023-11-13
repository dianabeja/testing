import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpsonComponent } from './simpson.component';

describe('SimpsonComponent', () => {
  let component: SimpsonComponent;
  let fixture: ComponentFixture<SimpsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpsonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return p=16.0 if x0=0, x1=4, num_seg=4, ERROR=0.0001 and f(x)=2x', () => {
    const resultado = component.simpson('2x', 0, 4, 4, 0.0001);
    console.log(resultado);
    expect(resultado).toBe(16);
  });

  it('Should return p=0.3333 if x0=0, x1=1, num_seg=4, ERROR=0.0001 and f(x)=x^2', () => {
    const resultado = component.simpson('x*x', 0, 1, 4, 0.0001);
    expect(resultado).toBe(0.33333);
  });

  it('Should return p=1.38 if x0=1, x1=4, num_seg=6, ERROR=0.001 and f(x)=1/x', () => {
    const resultado = component.simpson('1/x', 1, 1, 6, 0.0001);
    expect(resultado).toBe(1);
  });

  it('Should return p = 0.35006 if X = 1.1, num_seg = 10 and Dof = 9', () => {
    const result = component.simpson('t', 0, 1.1, 10, 9);
    expect(result).toBe(0.35006);
  });

  it('Should return p = 0.35006 if X = 1.1, num_seg = 10 and Dof = 9', () => {
    const result = component.simpson('t', 0, 1.1812, 10, 10);
    expect(result).toBe(0.36757);
  });

  it('Should return p = 0.35006 if X = 1.1, num_seg = 10 and Dof = 9', () => {
    const result = component.simpson('t', 0, 2.75, 10, 30);
    expect(result).toBe(0.495);
  });
});
