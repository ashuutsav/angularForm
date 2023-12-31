import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';

// function chkPwd(control1: string, control2: string): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     const controlValue1 = control.get(control1).value;
//     const controlValue2 = control.get(control2).value;
//     if (controlValue1 == controlValue2) {
//       return null;
//     } else {
//       return { unequal: true };
//     }
//   };
// }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private crudService: CrudService) {
    // this.crudService.getDetails().subscribe((res) => {
    //   this.details = res;
    //   console.log(this.details);
    // });
  }
  ngOnInit(): void {}
  details: any;
  repeat: string = 'none';

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
    // console.log(this.registerForm.get('rpwd'));
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
      // chkPwd('pwd', 'rpwd'),
    ]),
  });

  registerOnsubmit() {
    // console.log(this.registerForm.get('firstName'));
    if (this.Pwd.value == this.Rpwd.value) {
      this.repeat = 'none';

      // console.log('submitted');
      if (
        !this.FirstName.errors &&
        !this.LastName.errors &&
        !this.Email.errors &&
        !this.Mobile.errors &&
        !this.Gender.errors
      ) {
        console.log('no error');
        this.crudService
          .registerUser([
            this.registerForm.value.firstName,
            this.registerForm.value.lastName,
            this.registerForm.value.email,
            this.registerForm.value.mobile,
            this.registerForm.value.gender,
            this.registerForm.value.pwd,
            this.registerForm.value.rpwd,
          ])
          .subscribe((res) => {
            console.log(res);
          });
      } else {
        console.log('error');
      }
    } else {
      this.repeat = 'inline';
    }
  }
}
