import{FormControl}from'@angular/forms';

export interface UserFormDetails{
    username: FormControl<string>;
    password: FormControl<string>; 
}
  