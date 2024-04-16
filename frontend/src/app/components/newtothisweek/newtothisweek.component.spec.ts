import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtothisweekComponent } from './newtothisweek.component';

describe('NewtothisweekComponent', () => {
  let component: NewtothisweekComponent;
  let fixture: ComponentFixture<NewtothisweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewtothisweekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewtothisweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
