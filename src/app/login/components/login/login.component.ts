import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserFormDetails } from '../../models/logindetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userForm!: FormGroup<UserFormDetails>;
  public passworduserform!: FormGroup<UserFormDetails>;
  public PuserForm!: FormGroup;
  frgotPassword: boolean = false;
  isUsernameIncorrect: boolean = false;
  isPasswordIncorrect: boolean = false;
  constructor(private translate: TranslateService) { }
  hide = true;
  ngOnInit(): void {
    this.prepareForm(this.userForm);
    this.forgotusername(this.PuserForm);
  }
  private forgotusername(userData: any) {
    this.PuserForm = new FormGroup({
      Pusername: new FormControl(userData && userData.Pusername ? userData.Pusername : '', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
          // Validators.pattern('^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+')
        ]
      })
    })
  }

  private prepareForm(userData: any): void {
    this.userForm = new FormGroup<UserFormDetails>({
      username: new FormControl(userData && userData.username ? userData.username : '', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
          //Validators.pattern('^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+')
        ]
      }
      ),
      password: new FormControl(userData && userData.password ? userData.password : '', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+')
        ]
      })
    })
  }
  get f() {
    return this.userForm.controls;
  }
  get g() {
    return this.PuserForm.controls;
  }
  onSubmit() {
    const username = 'S@1'
    const password = "Sarath@29"
    if (username != this.userForm.value.username) {
      this.isUsernameIncorrect = true;
      const passwordField = document.querySelector('#loginSections')!;
      passwordField.classList.remove('invalid-password');
      setTimeout(() => {
        passwordField.classList.add('invalid-password');
      }, 0);
      return;
    }
    if (password != this.userForm.value.password) {
      this.isPasswordIncorrect = true;
      const passwordField = document.querySelector('#loginSections')!;
      passwordField.classList.remove('invalid-password');
      setTimeout(() => {
        passwordField.classList.add('invalid-password');
      }, 0);
      return;
    }
  }
  forgotPassword() {
    this.frgotPassword = true;
  }
  backtomain() {
    this.frgotPassword = false;
  }
}
