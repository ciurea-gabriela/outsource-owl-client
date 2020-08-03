import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Category} from '../../../model/category.interface';
import {CategoryService} from '../../../core/services/category.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    public categories: Array<Category>;
    public _selectedCategoryId: string;

    @Input()
    set selectedCategoryId(id: string) {
        this._selectedCategoryId = id;
        this.changeDetector.detectChanges();
    }

    get selectedCategoryId() {
        return this._selectedCategoryId;
    }

    constructor(private router: Router,
                private categoryService: CategoryService,
                private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.getAllCategories();
    }

    getAllCategories(): void {
        this.categoryService.getAllCategories().subscribe(categories => this.categories = categories);
    }

    public goToCategories(id: number): void {
        this.router.navigate([`categories/${id}`]);
    }

    public goToAllCategories() {
        this.router.navigate([`categories`]);
    }

    public getCategoriesSelection(start: number, end: number): Array<Category> {
        return this.categories?.slice(start, end);
    }

}
