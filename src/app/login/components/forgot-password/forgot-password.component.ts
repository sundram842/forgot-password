import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { BreakpointObserver } from '@angular/cdk/layout';
const mediaQuery = '(max-width: 1024px)';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { noWhitespaceValidator } from 'src/app/global/components/no-white-space-validator';
import { UserFormDetails } from '../../models/forgot-password';
import { Subscription } from 'rxjs';
import { LoginService } from '../../data-providers/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  public userForm!: UntypedFormGroup;
  public readonly backGroundIMage = environment.loginpageBackground;
  private loginSub!: Subscription;
  public passwordResetLoader:boolean = false;
  public isEmailVisible: boolean = true;
  public isOtpVisible:boolean = false;
  public isPasswordVisible:boolean = false;
  public userEmail?:string;
  public isUserRegistered?:boolean;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
    
  ) {}
  ngOnInit(): void {
    this.prepareForm();
    this.getBackGroundImage();
  }
  public prepareForm() {
    this.userForm = new UntypedFormGroup({
      email: new UntypedFormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
          noWhitespaceValidator,
        ],
      }),
      otp: new UntypedFormControl('', {
        validators: [Validators.required, this.checkOtpLength],
      }),
      password: new UntypedFormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+'
          ),
          noWhitespaceValidator,
        ],
      }),
      confirmpassword: new UntypedFormControl('', {
        validators: [Validators.required, this.passwordMatchValidator],
      }),
    });
  }

  get f() {
    return this.userForm?.controls;
  }

  private getBackGroundImage() {
    const loginContainers = document.getElementsByClassName('loginSection');
    if (loginContainers.length === 0) {
      console.error('No elements with class "logincontainer" found.');
      return;
    }
    const loginContainer = loginContainers[0] as HTMLElement;
    this.breakpointObserver.observe([mediaQuery]).subscribe((state) => {
      if (state.matches) {
        loginContainer.style.backgroundImage = 'none';
      } else {
        loginContainer.style.backgroundImage = `url('${this.backGroundIMage}')`;
      }
    });
  }
  p() {
    console.log(this.userForm?.value);
  }

   private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.root.get('password')?.value;
    const confirmPassword = control.root.get('confirmpassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
  

  private checkOtpLength(control: AbstractControl): { [key: string]: boolean } | null{
    const otp = control.value;
      if (otp.length === 5) {
        return null
      } else {
        return { otpLength: true };
      }
  }

  get otpControl(): FormControl | null {
    return this.userForm.get('otp') as FormControl;
  }

  public resetPassword():void {
    this.passwordResetLoader = true;
        const email =this.userForm.get('email')?.value
        if(email) {
          this.loginSub = this.loginService.resetPassword(email).subscribe({
            next:(res:any) => {
              if(res?.success){
                this.isEmailVisible = false;
                 this.isOtpVisible = true;
                 this.userEmail = email;
              } else {
                this.f['email'].setErrors({ 'invalidEmail': true });
              }
              this.passwordResetLoader=false;
            }, error(err){
              console.log(err);
            }
          })
        }
  }

  public verificationCode(): void {
    const otp = this.userForm.get('otp')?.value
    if (otp) {
      this.loginSub = this.loginService.verificationCode(otp).subscribe({
        next: (res: any) => {
          if (res?.success) {
           
            this.isOtpVisible = false;
            this.isPasswordVisible = true;
          } else {
            this.f['otp'].setErrors({ 'invalidOTP': true });
          }
          this.passwordResetLoader = false;
        }, error(err) {
          console.log(err);
        }
      })
    }
  }

  public login():void{
    this.router.navigate(['/login']);
  }
}
