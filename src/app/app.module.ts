import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { CounterLocalComponent } from './counter-local/counter-local.component';
import { CounterStoreComponent } from './counter-store/counter-store.component';
import { CounterEffects } from './store/counter.effects';
import { counterReducer } from './store/counter.reducer';

@NgModule({
  declarations: [AppComponent, CounterLocalComponent, CounterStoreComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ counter: counterReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([CounterEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
