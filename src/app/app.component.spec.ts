import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set Mostrar_Pantalla to true in Ocultar method', () => {
    component.Ocultar();
    expect(component.Mostrar_Pantalla).toBe(true);
  });

  it('should set Mostrar_Pantalla to false in ngOnInit method', () => {
    component.ngOnInit();
    expect(component.Mostrar_Pantalla).toBe(false);
  });
});
