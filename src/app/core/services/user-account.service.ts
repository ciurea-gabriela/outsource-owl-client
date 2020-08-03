import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUp} from '../../model/sign-up.interface';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserAccountService {
    private readonly LOCAL_HOST_REGISTER_USER: string = 'http://localhost:8080/users';

    constructor(private http: HttpClient) {
    }

    public registerUser(signUp: SignUp): Observable<void> {
        return this.http.post<void>(this.LOCAL_HOST_REGISTER_USER, signUp);
    }

    public addUserBalance(userId: number, amount: number): Observable<any> {
        return this.http.post<any>(`http://localhost:8080/users/${userId}/balance`, {balance: amount});
    }
}
