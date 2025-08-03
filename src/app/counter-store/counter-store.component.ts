import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCounter } from '../store/counter.selectors';
import * as counterActions from '../store/counter.actions';

@Component({
  selector: 'app-counter-store',
  standalone: false,
  templateUrl: './counter-store.component.html',
  styleUrl: './counter-store.component.css'
})
export class CounterStoreComponent {
  counter$: Observable<number>;

  constructor(private store: Store) {
    this.counter$ = store.select(getCounter);
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
