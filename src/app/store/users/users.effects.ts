import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, of } from 'rxjs';
import * as usersActions from './users.actions';
import { UsersApiService } from '../../services/users-api.service';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadUsers),
      exhaustMap(() =>
        this.usersApi.getUsers().pipe(
          map((users) => usersActions.loadUsersSuccess({ users })),
          catchError((error: Error) =>
            of(usersActions.loadUsersFailure({
              error: error.message || 'Unable to load users.'
            }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersApi: UsersApiService
  ) {}
}
