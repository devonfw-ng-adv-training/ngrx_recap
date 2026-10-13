import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app-state';
import * as counterActions from '../store/counter.actions';
import { selectCounterValue } from '../store/counter.selectors';

@Component({
  selector: 'app-counter-store',
  standalone: false,
  templateUrl: './counter-store.component.html',
  styleUrl: './counter-store.component.css',
})
export class CounterStoreComponent {
  counter$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.counter$ = store.select(selectCounterValue);
  }

  increment() {
    this.store.dispatch(counterActions.increment());
  }

  reset() {
    this.store.dispatch(counterActions.reset());
  }

  decrement() {
    this.store.dispatch(counterActions.decrement());
  }
}
