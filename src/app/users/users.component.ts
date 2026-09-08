import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as usersActions from '../store/users/users.actions';
import { AppState } from '../store/app-state';
import * as usersSelectors from '../store/users/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  viewModel$ = this.store.select(usersSelectors.selectUsersViewModel);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.store.dispatch(usersActions.loadUsers());
  }
}
