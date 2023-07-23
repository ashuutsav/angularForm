import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private crudService: CrudService) {
    this.crudService.getDetails().subscribe((res) => {
      this.details = res;
      console.log(this.details);
    });
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
      // this.chkPwd(),
    ]),
  });

  registerOnsubmit() {
    // console.log(this.registerForm.get('firstName'));
    if (this.Pwd.value == this.Rpwd.value) {
      this.repeat = 'none';

      console.log('submitted');

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
      this.repeat = 'inline';
    }
  }

  // chkPwd(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     let x = this.registerForm.get('pwd');
  //     if (control.value == x) {
  //       return null;
  //     } else {
  //       return { unequal: true };
  //     }
  //   };
  // }
}
