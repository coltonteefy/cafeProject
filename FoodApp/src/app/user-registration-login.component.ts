import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {User} from "./models/user.model";
import {ValidateService} from "./services/validate.service";
import {trigger, state, style, transition, animate} from "@angular/animations";

@Component({
  selector: 'user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate(100, style({height: 0}))
      ])
    ])
  ]
})
export class UserRegistrationComponent implements OnInit {

  loginScreen = true;
  registerScreen = false;
  emailValid = false;
  registerForm: User = new User();
  emptyFilled = false;
  emailText = false;
  animateFieldAlert = '';
  animateEmailAlert = '';
  allPass = false;

  constructor(private userService: UserService,
              private validateService: ValidateService) {
  }

  ngOnInit() {
    // window.setTimeout(console.log('crazy'), 2000);
  }

  switchToRegister() {
    this.registerScreen = true;
    this.loginScreen = false;
    document.getElementById('registerBtn').style.backgroundColor = '#ffb500';
    document.getElementById('registerBtn').style.borderColor = '#d59400';
    document.getElementById('registerBtn').style.color = '#fff';
    document.getElementById('logBtn').style.color = 'black';
    document.getElementById('logBtn').style.backgroundColor = 'rgba(208, 205, 205, 0.1)';
  }

  switchToLogin() {
    this.registerScreen = false;
    this.loginScreen = true;
    document.getElementById('logBtn').style.backgroundColor = '#ffb500';
    document.getElementById('logBtn').style.borderColor = '#d59400';
    document.getElementById('logBtn').style.color = '#fff';
    document.getElementById('registerBtn').style.color = 'black';
    document.getElementById('registerBtn').style.backgroundColor = 'rgba(208, 205, 205, 0.1)';
  }

  submitRegistrationClick() {
    // validate register form
    if (!this.validateService.validateRegister(this.registerForm)) {
      this.emptyFilled = true;
      this.animateFieldAlert = 'in';
      setTimeout(() => {
        this.removeText()
      }, 2500);
      this.emailText = false;
      return false;
    }
    // validate email
    if (!this.validateService.validateEmail(this.registerForm.email)) {
      this.emptyFilled = false;
      this.emailText = true;
      this.animateEmailAlert = 'in';
      setTimeout(() => {
        this.removeText()
      }, 2500);
      this.emailValid = true;
      this.registerForm.email = '';
      return false;
    }

    // insert user into database if everything is validated
    if (this.validateService.validateEmail(this.registerForm.email) && this.validateService.validateRegister(this.registerForm)) {
      console.log("all pass");
      this.userService.createUser(this.registerForm)
        .subscribe((res) => {
          this.registerForm = new User();
        });
      this.registerForm = new User();
      this.emailText = false;
      this.emptyFilled = false;
      this.allPass = true;
      this.switchToLogin();
      setTimeout(() => {
        this.removeText()
      }, 2500);
    }
  }

  removeText() {
    this.emptyFilled = false;
    this.emailText = false;
    this.allPass = false;
    this.animateEmailAlert = 'out';
    this.animateFieldAlert = 'out';
  }

  // check() {
  //   document.getElementById("option1").checked = true;
  // }

  // userLogin() {
  //   console.log('login');
  //   console.log(this.registerForm.username);
  //   console.log(this.userService.getUser(this.registerForm.username));
  //   // this.userService.getUser(this.registerForm.username);
  // }


}
