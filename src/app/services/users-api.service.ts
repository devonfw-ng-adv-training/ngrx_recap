import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../store/users/users.models';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  getUsers(): Observable<User[]> {
    return of([
      { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
      { id: 2, name: 'Grace Hopper', email: 'grace@example.com' },
      { id: 3, name: 'Katherine Johnson', email: 'katherine@example.com' }
    ]).pipe(delay(800));
  }
}
