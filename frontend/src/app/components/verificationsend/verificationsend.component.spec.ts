import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationsendComponent } from './verificationsend.component';

describe('VerificationsendComponent', () => {
  let component: VerificationsendComponent;
  let fixture: ComponentFixture<VerificationsendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationsendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificationsendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
