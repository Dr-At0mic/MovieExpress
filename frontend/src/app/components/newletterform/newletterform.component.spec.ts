import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewletterformComponent } from './newletterform.component';

describe('NewletterformComponent', () => {
  let component: NewletterformComponent;
  let fixture: ComponentFixture<NewletterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewletterformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewletterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
