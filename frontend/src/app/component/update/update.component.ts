import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private router: Router
  ) {}
  id: string | null = '';
  repeat: string = 'none';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

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

  updateOnsubmit() {
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
          .updateDetails(
            [
              this.registerForm.value.firstName,
              this.registerForm.value.lastName,
              this.registerForm.value.email,
              this.registerForm.value.mobile,
              this.registerForm.value.gender,
              this.registerForm.value.pwd,
              this.registerForm.value.rpwd,
            ],
            this.id
          )
          .subscribe((res) => {
            console.log(res);
          });
      } else {
        console.log('error');
      }
    } else {
      this.repeat = 'inline';
    }
    this.router.navigate(['/']);
  }
}
