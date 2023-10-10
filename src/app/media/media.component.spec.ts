import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaComponent } from './media.component';

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return mean = 550.6 with the data', () => {
    const result= MediaComponent.getMedia(   
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
    expect(result).toBe(550.6)
  })
});
