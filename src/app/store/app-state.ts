import { UsersState } from './users/users.models';

export interface AppState {
    counter: number;
    users: UsersState;
}