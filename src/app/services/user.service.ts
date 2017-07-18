import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class UserService {
  private headers = new Headers({'content-type': 'application/json'});
  constructor(private http: Http) { }

  createUser() {
    const body = {
      first_name: 'test1',
      last_name: 'test1',
      email: 'test1',
      username: 'test1',
      password: 'test1', // passport should hash this for security, but ok for now
      role: 'test1'
    };
    return this.http.post('user/create', JSON.stringify(body), {headers: this.headers})
      .map(res => res.json())
  }

}
