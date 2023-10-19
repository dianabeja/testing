import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LinearRegressionComponent } from './linear-regression.component';
import { TestService } from '../service/datatest1.service';
import { Calculate } from '../calculate';

describe('LinearRegressionComponent', () => {
  let component: LinearRegressionComponent;
  let fixture: ComponentFixture<LinearRegressionComponent>;
  let service: TestService;
  let dataTest1: any;
  let dataTest2: any;
  let dataTest3: any;
  let dataTest4: any;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TestService],
      declarations: [ LinearRegressionComponent ]
      
    })
    .compileComponents();
    service = TestBed.inject(TestService);

    fixture = TestBed.createComponent(LinearRegressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach((done: DoneFn) => {
    service.getTest1().subscribe(response => {
      dataTest1 = response;
      done();
    });
  });

  beforeEach((done: DoneFn) => {
    service.getTest2().subscribe(response => {
      dataTest2 = response;
      done();
    });
  });
  
  beforeEach((done: DoneFn) => {
    service.getTest3().subscribe(response => {
      dataTest3 = response;
      done();
    });
  });
  
  beforeEach((done: DoneFn) => {
    service.getTest4().subscribe(response => {
      dataTest4 = response;
      done();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return B0=-22.55 with the dataset Data_Test1', () => {
    const B0 = component.B0(dataTest1.proxy_size, dataTest1.actual_added);
    expect(B0).toBeCloseTo(-22.55, 2);
  });

  it('Should return B1=1.7279 with the dataset Data_Test1', () => {
    const B1 = component.B1(dataTest1.proxy_size, dataTest1.actual_added);
    expect(B1).toBeCloseTo(1.7279, 4);
  });

  it('Should return yk=644.429 with the dataset Data_Test1 if x=386', () => {
    const yk = component.yk(dataTest1.proxy_size, dataTest1.actual_added, 386);
    expect(yk).toBeCloseTo(644.429, 3);
  });

  
  it('Should return B0=-4.039 with the dataset Data_Test2', () =>{
    const B0 =component.B0(dataTest2.proxy_size, dataTest2.actual_develop);
    expect(B0).toBeCloseTo(-4.039, 3);
  });

  it('Should return B1=0.1681 with the dataset Data_Test2', () =>{
    const B1 =component.B1(dataTest2.proxy_size, dataTest2.actual_develop);
    expect(B1).toBeCloseTo(0.1681, 4);
  })

  it('Should return yk=60.858 with the dataset Data_Test2 if x=386', () =>{
    const yk = component.yk(dataTest2.proxy_size, dataTest2.actual_develop, 386);
    expect(yk).toBeCloseTo(60.858, 3);
  })

  it('Should return B0=-23.92 with the dataset Data_Test3', () =>{
    const B0 =component.B0(dataTest3.plan_added, dataTest3.actual_added);
    expect(B0).toBeCloseTo(-23.92, 2);
  })

  it('Should return B1=1.43097 with the dataset Data_Test3  ', () =>{
    const B1 =component.B1(dataTest3.plan_added, dataTest3.actual_added);
    expect(B1).toBeCloseTo(1.43097, 5);
  })

  it('Should return yk=528.4294 with the dataset Data_Test3 if x=386  ', () =>{
    const yk = component.yk(dataTest3.plan_added, dataTest3.actual_added, 386);
    expect(yk).toBeCloseTo(528.4294, 4);
  })

  it(' Should return B0=-4.604 with the dataset Data_Test4  ', () =>{
    const B0 =component.B0(dataTest4.proxy_added, dataTest4.actual_develop);
    expect(B0).toBeCloseTo(-4.604, 3);
  })

  it(' Should return B1=0.16064 with the dataset Data_Test4  ', () =>{
    const B1 =component.B1(dataTest4.proxy_added, dataTest4.actual_develop);
    expect(B1).toBeCloseTo(0.14016, 4);
  })

  xit('Should return yk=49.4994 with the dataset Data_Test4 if x=386', () =>{
    const yk = component.yk(dataTest4.proxy_added, dataTest4.actual_develop, 386);
    expect(yk).toBeCloseTo(49.4994, 4);
  })
});
