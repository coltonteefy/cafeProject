import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";

@Injectable()
export class ValidateService {

  constructor() {
  }

  validateRegister(user) {
    if (user.first_name === "" || user.last_name === "" || user.email === "" ||
      user.username === "" || user.password === "") {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(user) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(user);
  }
}
