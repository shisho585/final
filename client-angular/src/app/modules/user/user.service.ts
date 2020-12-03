import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getUser(email: string) {
    if (this.user) return from([this.user]);
    else {
      return this.http.get<User>(
        'http://localhost:3000/api/user/' + email,
        { headers: { authorization: localStorage.getItem('loggedInToken') } }
      );
    }
  }

  deleteUser(email: string) {
    return this.http.delete(
      'http://localhost:3000/api/user/' + email,
      { headers: { authorization: localStorage.getItem('loggedInToken') } }
    )
  }

  updateUser(user: User) {
    return this.http.put(
      'http://localhost:3000/api/user/' + user.id,
      user,
      { headers: { authorization: localStorage.getItem('loggedInToken') } }
    )
  }

  navigateToHome() {
    this.router.navigate(['user']);
  }
}
