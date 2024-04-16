import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingnowComponent } from './trendingnow.component';

describe('TrendingnowComponent', () => {
  let component: TrendingnowComponent;
  let fixture: ComponentFixture<TrendingnowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingnowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrendingnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
