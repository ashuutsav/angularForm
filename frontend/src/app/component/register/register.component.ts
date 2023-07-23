import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  get FirstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }

  get LastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }

  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }

  get Gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }

  get Pwd(): FormControl {
    return this.registerForm.get('pwd') as FormControl;
  }

  get Rpwd(): FormControl {
    return this.registerForm.get('rpwd') as FormControl;
  }

  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('[0-9]*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    pwd: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
    rpwd: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      this.chkPwd(),
    ]),
  });

  registerOnsubmit() {
    console.log(this.registerForm.get('firstName'));
  }

  chkPwd(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const rpwdControl = this.registerForm.get('rpwd');
      const pwdControl = this.registerForm.get('pwd');

      // Check if both controls are defined before accessing their values
      if (rpwdControl && pwdControl) {
        const rpwdValue = rpwdControl.value;
        const pwdValue = pwdControl.value;

        // Now you can compare the values or perform any other logic
        // For example, checking if they match:
        if (rpwdValue === pwdValue) {
          return null;
        }
      }

      // Return a default value or appropriate handling if controls are undefined
      return { unequal: true };

      // let x = this.registerForm.get('pwd');
      // if (control.value == x) {
      //   return null;
      // } else {
      //   return { unequal: true };
      // }
    };
  }
}