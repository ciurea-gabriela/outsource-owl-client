import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../core/services/category.service';
import {Category} from '../../../model/category.interface';
import {Router} from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    public categories: Array<Category>;

    constructor(private categoryService: CategoryService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getAllCategories();
    }

    public getAllCategories(): void {
        this.categoryService.getAllCategories().subscribe(categories => this.categories = categories);
    }

    public goToCategories(id: number): void {
        this.router.navigate([`categories/${id}`]);
    }

}
