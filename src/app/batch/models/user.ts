import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/global/utils/adapter';
export class User {
    id?: number;
    firstName?: string;
    lastName?: string;
    displayName?: string;
}
@Injectable({
    providedIn: 'root',
})
export class UserAdapter implements Adapter<User>
{
    adapt(data: any): User {
        const user = new User();
        try {
            user.id = data.id;
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.displayName = data.displayName;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
        return user;
    }

}
