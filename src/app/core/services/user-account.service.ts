import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUp} from '../../model/sign-up.interface';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserAccountService {
    private readonly API_URI_REGISTER_USER: string = 'https://outsource-owl-api.herokuapp.com/users';

    constructor(private http: HttpClient) {
    }

    public registerUser(signUp: SignUp): Observable<void> {
        return this.http.post<void>(this.API_URI_REGISTER_USER, signUp);
    }

    public addUserBalance(userId: number, amount: number): Observable<any> {
        return this.http.post<any>(`https://outsource-owl-api.herokuapp.com/${userId}/balance`, {balance: amount});
    }
}
