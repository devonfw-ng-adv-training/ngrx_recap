import { createSelector } from '@ngrx/store';
import { AppState } from './app-state';

export const selectCounter = (state: AppState) => state.counter;

export const selectCounterValue = createSelector(
  selectCounter,
  (state) => state.value,
);
