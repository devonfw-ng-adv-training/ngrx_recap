import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterLocalComponent } from './counter-local.component';

describe('CounterLocalComponent', () => {
  let component: CounterLocalComponent;
  let fixture: ComponentFixture<CounterLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
