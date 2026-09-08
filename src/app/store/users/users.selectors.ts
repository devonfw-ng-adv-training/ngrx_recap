import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.models';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectUsersState,
  (state) => state.error
);

export const selectUsersLoading = selectLoading;
export const selectUsersError = selectError;

export const selectUsersViewModel = createSelector(
  selectUsers,
  selectLoading,
  selectError,
  (users, loading, error) => ({ users, loading, error })
);
