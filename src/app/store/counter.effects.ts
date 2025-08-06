import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { delay, map } from "rxjs";
import * as counterActions from '../store/counter.actions';

@Injectable()
export class CounterEffects {
    constructor(private actions$: Actions) {}

    delayedIncrement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(counterActions.delayedIncrement),
            delay(5000), // Delay by 5 seconds
            map(() => counterActions.increment())
        )
    );
}