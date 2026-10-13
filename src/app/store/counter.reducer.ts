import { createReducer, on } from '@ngrx/store';
import { CounterState } from './app-state';
import * as counterActions from './counter.actions';

export const initialState: CounterState = {
  value: 0,
};

export const counterReducer = createReducer(
  initialState,
  on(counterActions.increment, (state) => ({
    ...state,
    value: state.value + 1,
  })),
  on(counterActions.decrement, (state) => ({
    ...state,
    value: state.value - 1,
  })),
  on(counterActions.reset, (state) => initialState),
);
