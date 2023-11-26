import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Adapter } from 'src/app/global/utils/adapter';

export class UserFormDetails{
    email?: FormControl<string>;
    password?: FormControl<string>;
    confirmpassword?:FormControl<string>
    otp?:FormControl<string>
}
export class ResetPassword{
    
}

@Injectable({
    providedIn: 'root',
})

export class ResetPasswordAdapter implements Adapter<any>{
    adapt(data: any) {

    }
}