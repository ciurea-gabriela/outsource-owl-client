import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../model/category.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private readonly API_URI = 'https://outsource-owl-api.herokuapp.com/categories';

    constructor(private http: HttpClient) {
    }

    public getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.API_URI);
    }

    public getCategory(id: string): Observable<Category> {
        return this.http.get<Category>(`${this.API_URI}/${id}`);
    }
}
