import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CounterLocalComponent } from './counter-local/counter-local.component';
import { counterReducer } from './store/counter/counter.reducer';
import { CounterStoreComponent } from './counter-store/counter-store.component';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './store/counter/counter.effects';
import { usersReducer } from './store/users/users.reducer';
import { UsersEffects } from './store/users/users.effects';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterLocalComponent,
    CounterStoreComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ counter: counterReducer, users: usersReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([CounterEffects, UsersEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
