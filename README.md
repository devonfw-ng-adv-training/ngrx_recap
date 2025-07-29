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
| `exercise-1-ngrx-basic-setup`   | NgRx base setup                                  |
| `exercise-2-counter-component`  | Add CounterComponent UI                          |
| `exercise-3-ngrx-counter-store` | Setup NgRx store, actions, reducer, selectors    |
| `exercise-4-ngrx-effect`        | Add NgRx Effect for delayed increment            |

If you have trouble during one step, you can cheat by taking a look at the specified backup branch 
(start with 0-start-setup, result of first step is 1-finished-ngrx-setup, and so on.)

*hint: provided solution in backup branch may not be the best possible solution*

If there are questions, you can contact one of your trainers or keep them for the training.

## Exercise 1. Basic Setup of ngrx

### Goal:
Set up an appplication with NgRx Store and Effects (empty configuration). 

### Steps:

### 1. Check out project
    
    git clone https://github.com/devonfw-ng-adv-training/ngrx--recapp

### 2. Start with initial branch

    git checkout 0-start-setup

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

### 7. Start the Application

    ng serve

### 8. Confirm successful setup

Check out application state in the browser and confirm *@ngrx/state/init* in the dev tools


### Backup branch

backup branch exists as [exercise-1-ngrx-basic-setup](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise-1-ngrx-basic-setup) and will be used in the next step

## Exercise 2: Add Counter Component UI

### Goal:
Generate a basic counter component with increment/decrement buttons. 

### Steps:

### 1. Generate the component:

    ng generate component counter

### 2. Update app.component.html:

```html
<app-counter></app-counter>
```

### 3. Update counter.component.ts:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})

export class CounterComponent {
  counter = 0;

  increment() {
    console.log('Increment clicked');
  }

  decrement() {
    console.log('Decrement clicked');
  }
}
```

### 4. Update counter.component.html:

```html
<h2>Counter: {{ counter }}</h2>
<button (click)="increment()">+</button>
<button (click)="decrement()">-</button>
```

### Backup branch

backup branch exists as [exercise-2-counter-component](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise-2-counter-component) and will be used in the next step


## Exercise 3: Add NgRx Counter Store

### Goal:
Use NgRx to manage counter state with actions, reducer, and selectors. 

### Steps:

### 1. Create file:src/app/store/app-state.ts

```ts
export { createAction } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
```

### 2. Create file:src/app/store/counter.action.ts

```ts
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
```

### 3. Create file:src/app/store/counter.reducer.ts

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

```ts
import { counterReducer } from './store/counter.reducer';

@NgModule({
 imports: [
   StoreModule.forRoot({ counter: counterReducer }),
   EffectsModule.forRoot([]),
 ],
})
```

### 6. Update counter.component.ts

```ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement } from '../store/counter.actions';
import { getCounter } from '../store/counter.selectors';

@Component({
 selector: 'app-counter',
 templateUrl: './counter.component.html'
})

export class CounterComponent {
 counter$: Observable<number>;

 constructor(private store: Store) {
   this.counter$ = this.store.select(getCounter);
 }

 increment() {
   this.store.dispatch(increment());
 }

 decrement() {
   this.store.dispatch(decrement());
 }
}
```

### 7. Update counter.component.html:

```html
<h2>Counter: {{ counter | async }}</h2>
<button (click)="increment()">+</button>
<button (click)="decrement()">-</button>
```

#### verify result with redux devtools

fire up the application and check out if the value on Redux DevTools is correctly set to initial value of 0



### Backup branch

backup branch exists as [exercise-3-ngrx-counter-store](https://github.com/devonfw-ng-adv-training/ngrx_recap/tree/exercise-2-counter-store) and will be used in the next step


## Exercise 4: Add NgRx Effect for Delayed Increment

### Goal:
Add an effect that dispatches increment after a 5-second delay. 

### Steps:

### 1. Create file:src/app/store/counter.effects.ts

```ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map } from 'rxjs/operators';
import { increment } from './counter.actions';

@Injectable()
export class CounterEffects {

  delayedIncrement$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Counter] Delayed Increment'),
      delay(5000),
      map(() => increment())
    )
  );

  constructor(private actions$: Actions) {}
}
```

### 2. Register it in app.module.ts

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

### 3. Update counter.component.ts

```ts
delayedIncrement() {
 this.store.dispatch({ type: '[Counter] Delayed Increment' });
}
```

### 4. Update counter.component.html

```html
<button (click)="delayedIncrement()">Delayed +</button>
```

### Backup branch

backup branch exists as [exercise-4-ngrx-effect](https://github.com/devonfw-ng-adv-training/refresher/tree/exercise-4-ngrx-effects) and will be used in the next step
