import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {User} from "../models/user.model";

@Injectable()
export class UserService {
  private headers = new Headers({'content-type': 'application/json'});

  constructor(private http: Http) {
  }

  createUser(body: User) {
    // doing what post man is doing and passing json string
    return this.http.post('user/create', JSON.stringify(body), {headers: this.headers})
      .map(res => res.json());
  }

  getUser(user) {
    return this.http.get(`/user/create/${user.username}`).map(res => res.json());
  }
}
