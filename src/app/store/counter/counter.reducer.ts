import { createReducer, on } from "@ngrx/store";
import * as counterActions  from "./counter.actions";

export const initialState = 0;

export const counterReducer = createReducer(
    initialState,
    on(counterActions.increment, (state) => state + 1),
    on(counterActions.decrement, (state) => state - 1),
    on(counterActions.reset, () => 0),
);