import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersComponent } from './users.component';
import { usersReducer } from '../store/users/users.reducer';
import { UsersEffects } from '../store/users/users.effects';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  exports: [UsersComponent]
})
export class UsersModule {}
