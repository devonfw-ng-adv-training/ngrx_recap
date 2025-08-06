# NgAdvRefresher

## Introduction

This project walks you through setting up and using NgRx in an Angular 17 application using a simple Counter app. You'll learn how to configure NgRx Store, Actions, Reducers, Selectors, and Effects step-by-step.

### further read

- [angular foundations: all slides](https://devonfw-training.github.io/devon4ng-training/agenda/foundations-remote.html)
- [angular foundations: ngrx intro](https://devonfw-training.github.io/devon4ng-training/ngrx/intro.html)
- [official ngrx docs](https://ngrx.io/docs)

### content of exercise

## 📁 Git Branch Structure
| Branch Name                     | Description                                      |
|---------------------------------|--------------------------------------------------|
| [exercise/1-ngrx-basic-setup](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise/1-ngrx-basic-setup)   | NgRx base setup                                  |
| [exercise/2-counter-component](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise/2-counter-component)  | Add CounterComponent UI                          |
| [exercise/3-ngrx-counter-store](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise/3-ngrx-counter-store) | Setup NgRx store, actions, reducer, selectors    |
| [exercise/4-ngrx-effect](https://github.com/devonfw-ng-adv-training/refresher/tree/exercise/4-ngrx-effects)        | Add NgRx Effect for delayed increment            |

If you have trouble during one step, you can cheat by taking a look at the specified backup branch 
(start with 0-start-setup, result of first step is 1-finished-ngrx-setup, and so on.)

*hint: provided solution in backup branch may not be the best possible solution*

If there are questions, you can contact one of your trainers or keep them for the training.

## 📝 Summary of Exercises

| Exercise | Title                          | Goal                                                                 | Key Concepts Covered                              | Backup Branch                  |
|----------|--------------------------------|----------------------------------------------------------------------|---------------------------------------------------|--------------------------------|
| 1        | Basic Setup of NgRx            | Set up NgRx Store and Effects with empty configuration              | NgRx Store, DevTools, Initial Setup               | [exercise/1-ngrx-basic-setup](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise/1-ngrx-basic-setup) |
| 2        | Add Counter Component UI       | Create a simple counter component with increment/decrement buttons  | Angular Component, UI Binding                     | [exercise/2-counter-component](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise/2-counter-component)|
| 3        | Add NgRx Counter Store         | Manage counter state using NgRx actions, reducer, and selectors     | Actions, Reducer, Selectors, State Management     | [exercise/3-ngrx-counter-store](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise/3-ngrx-counter-store)|
| 4        | Add NgRx Effect for Delayed Increment | Dispatch increment action after a delay using NgRx Effects     | Effects, Async Actions, Side Effects              | [exercise/4-ngrx-effect](https://github.com/devonfw-ng-adv-training/refresher/tree/exercise/4-ngrx-effects) 

## Exercise 1. Basic Setup of ngrx

### Goal:
Set up an appplication with NgRx Store and Effects (empty configuration). 

### Steps:

### 1. Check out project
    
    git clone https://github.com/devonfw-ng-adv-training/ngrx--recapp

### 2. Start with initial branch

    git checkout 0-initial-start

### 3. Install dependencies
    
    npm install 

### 4. Add [@ngrx/store](https://ngrx.io/guide/store/install) &  [@ngrx/store-devtools](https://ngrx.io/guide/store-devtools/install) to project
    
    ng add @ngrx/store@17.1.1
    ng add @ngrx/store-devtools@17.1.1

### 5. Install [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension) for your favorite browser
  
  - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools)
  - [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
  - [Internet Explorer](https://www.youtube.com/watch?v=oHg5SJYRHA0)

### 6. Update app.module.ts

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
 declarations: [AppComponent],
 imports: [
   BrowserModule,
   StoreModule.forRoot({}, {}),
   EffectsModule.forRoot([]),
 ],
 providers: [],
 bootstrap: [AppComponent],
})
export class AppModule {}
```

### 7. Start Application

    ng serve

### 8. Verify setup: 

Open Redux DevTools in your browser and confirm the presence of @ngrx/store/init.


### Backup branch

[exercise/1-ngrx-basic-setup](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise/1-ngrx-basic-setup) and it will be used in the next step

## Exercise 2: Add Counter Component UI

### Goal:
Generate a basic counter component with increment/decrement buttons. 

### Steps:

### 1. Generate the component:

    ng generate component counter-local

### 2. Update app.component.html to include the new component:

```html
<app-counter-local></app-counter-local>
```

### 3. Update counter-local.component.ts to define local counter logic.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-local',
  standalone: false,
  templateUrl: './counter-local.component.html',
  styleUrl: './counter-local.component.css'
})

export class CounterLocalComponent {
  counter = 0;

  increment() {
    this.counter++;
  }

  reset() {
    this.counter = 0;
  }

  decrement() {
    this.counter--;
  }
}
```

### 4. Update counter-local.component.html to include buttons and display:

```html
<h2>Counter (Local State): {{ counter }}</h2>
<button (click)="increment()">+</button>
<button (click)="reset()">Reset</button>
<button (click)="decrement()">-</button>
```

### Verify:

UI after adding basic buttons and counter logic.

### Backup branch

[exercise/2-counter-component](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise/2-counter-component) and it will be used in the next step


## Exercise 3: Add NgRx Counter Store

### Goal:
Use NgRx to manage counter state with actions, reducer, and selectors. 

### Steps:

### 1. Create file:src/app/store/app-state.ts
       Define the root state interface.

```ts
export interface AppState {
    counter: number;
}
```

### 2. Create file:src/app/store/counter.action.ts
       Define `increment`, `decrement`, and `reset` actions.

```ts
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
```

### 3. Create file:src/app/store/counter.reducer.ts
       Implement reducer logic for counter actions.

```ts
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initialState = 0;

export const counterReducer = createReducer(
 initialState,
 on(increment, (state) => state + 1),
 on(decrement, (state) => state - 1),
 on(reset, () => 0)
);
```

### 4. Create file:src/app/store/counter.selectors.ts
       Define a selector to get the counter value from the state.

```ts
import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store';

export const selectCounter = (state: AppState) => state.counter;
export const getCounter = createSelector(
  selectCounter,
  (counter) => counter
);
```

### 5. Update app.module.ts
       Register the reducer using `StoreModule.forRoot`.

```ts
import { counterReducer } from './store/counter.reducer';

@NgModule({
 imports: [
   StoreModule.forRoot({ counter: counterReducer }),
   EffectsModule.forRoot([]),
 ],
})
```

### 6. Update counter-store.component.ts
       Add logic with store dispatch and selector subscription.

```ts
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

```

### 7. Update counter-store.component.html:
       Bind buttons to dispatch actions and display store-managed counter.

```html
<h2>Counter from Store: {{ counter$ | async }}</h2>
<button (click)="increment()">+</button>
<button (click)="reset()">Reset</button>
<button (click)="decrement()">-</button>
```

#### Verify with Redux DevTools

Confirm that the counter (Counter froom Store) value is managed by NgRx and updates correctly. 


### Backup branch

[exercise/3-ngrx-counter-store](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise/3-ngrx-counter-store) and it will be used in the next step


## Exercise 4: Add NgRx Effect for Delayed Increment

### Goal:
Add an effect that dispatches increment after a 5-second delay. 

### Steps:

### 1. Add NgRx Effect
    
    ng add @ngrx/effects@17.1.1

### 2. Create file:src/app/store/counter.effects.ts

```ts
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
```

### 3. Register it in app.module.ts

```ts
import { counterReducer } from './store/counter.reducer';
import { CounterEffects } from './store/counter.effects';

@NgModule({
 imports: [
   StoreModule.forRoot({ counter: counterReducer }),
   EffectsModule.forRoot([CounterEffects]),
 ],
})
```

### 4. Update counter-store.component.ts

```ts
delayedIncrement() {
    this.store.dispatch(counterActions.delayedIncrement());
}
```

### 5. Update counter-store.component.html

```html
<button (click)="delayedIncrement()">Delayed +</button>
```

### Verify:

Clicking "Delayed +" will update the counter after 5 seconds (NgRx Effect).

### Backup branch

[exercise/4-ngrx-effect](https://github.com/devonfw-ng-adv-training/refresher/tree/exercise/4-ngrx-effects) and it will be used in the next step
