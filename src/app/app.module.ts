import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CounterLocalComponent } from './counter-local/counter-local.component';
import { counterReducer } from './store/counter.reducer';
import { CounterStoreComponent } from './counter-store/counter-store.component';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './store/counter.effects';

@NgModule({
  declarations: [
    AppComponent,
    CounterLocalComponent,
    CounterStoreComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ counter: counterReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([CounterEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
