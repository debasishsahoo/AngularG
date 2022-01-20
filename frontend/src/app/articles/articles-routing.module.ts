import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { CreateArticlesComponent } from './components/create-articles/create-articles.component';
import { AuthGuard } from '../account/services/auth.guard';
const routes: Routes = [
  { path: 'articles', component: ArticleListComponent },
  { path: 'article/:id', component: ArticleDetailsComponent },
  {
    path: 'create',
    component: CreateArticlesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: CreateArticlesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
