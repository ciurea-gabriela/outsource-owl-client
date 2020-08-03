import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../model/category.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private readonly LOCAL_HOST_CATEGORIES = 'http://localhost:8080/categories';

    constructor(private http: HttpClient) {
    }

    public getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.LOCAL_HOST_CATEGORIES);
    }

    public getCategory(id: string): Observable<Category> {
        return this.http.get<Category>(`${this.LOCAL_HOST_CATEGORIES}/${id}`);
    }
}
