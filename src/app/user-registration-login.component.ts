import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  loginScreen = true;
  registerScreen = false;

  constructor() {
  }

  ngOnInit() {
  }

  switchToRegister() {
    this.registerScreen = true;
    this.loginScreen = false;
    console.log(this.loginScreen);
  }

  switchToLogin() {
    this.registerScreen = false;
    this.loginScreen = true;
    console.log(this.loginScreen);
  }
}
