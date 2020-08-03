import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CategoryComponent} from './category/category.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {JobComponent} from './job/job.component';
import {PurchaseComponent} from './purchase/purchase.component';


const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'categories', component: CategoryComponent},
    {path: 'categories/:id', component: CategoryComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'jobs/:id', component: JobComponent},
    {path: 'purchases/:id', component: PurchaseComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
