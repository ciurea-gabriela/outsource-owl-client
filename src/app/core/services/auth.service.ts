import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Login} from '../../model/login.interface';
import {CurrentUserInfo} from '../../model/current-user-info.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {

    }

    public login(login: Login): Promise<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            observe: 'response' as 'response'
        };

        return new Promise((resolve, reject) => {
            this.http.post('http://localhost:8080/signin', login, httpOptions).subscribe(
                (response: HttpResponse<any>) => {
                    const jwt = response.headers.get('Authorization');
                    this.setSession(jwt, response.body);
                    resolve(response.body);
                },
                (err: HttpErrorResponse) => {
                    reject(err.status);
                });
        });
    }

    private setSession(jwt: string, currentUser: CurrentUserInfo): void {
        localStorage.setItem('token', jwt);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    public logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    }

    public isLoggedIn(): boolean {
        const token = this.getToken();
        const currentUser = this.getCurrentUser();
        return (token !== null && token !== undefined) && (currentUser !== null && currentUser !== undefined);
    }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public getCurrentUser(): string {
        return localStorage.getItem('currentUser');
    }

    public async refreshCurrentUser() {
        const response = await this.http.get('http://localhost:8080/users/current-info').toPromise();
        localStorage.setItem('currentUser', JSON.stringify(response));
    }
}
