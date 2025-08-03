import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStoreComponent } from './counter-store.component';

describe('CounterStoreComponent', () => {
  let component: CounterStoreComponent;
  let fixture: ComponentFixture<CounterStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
