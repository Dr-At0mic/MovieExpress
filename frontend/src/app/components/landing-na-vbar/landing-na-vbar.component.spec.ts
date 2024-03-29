import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingNaVBarComponent } from './landing-na-vbar.component';

describe('LandingNaVBarComponent', () => {
  let component: LandingNaVBarComponent;
  let fixture: ComponentFixture<LandingNaVBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingNaVBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingNaVBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
