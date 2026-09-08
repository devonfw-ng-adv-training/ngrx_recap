import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as usersActions from '../store/users/users.actions';
import { AppState } from '../store/app-state';
import { User } from '../store/users/users.models';
import * as usersSelectors from '../store/users/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> = this.store.select(usersSelectors.selectUsers);
  loading$: Observable<boolean> = this.store.select(usersSelectors.selectUsersLoading);
  error$: Observable<string | null> = this.store.select(usersSelectors.selectUsersError);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.store.dispatch(usersActions.loadUsers());
  }
}
