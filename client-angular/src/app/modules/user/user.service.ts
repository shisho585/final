import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(email: string) {
    return this.http.get<User>(
      'http://localhost:3000/api/user/' + email,
      { headers: { authorization: localStorage.getItem('loggedInToken') } }
    );
  }
}
