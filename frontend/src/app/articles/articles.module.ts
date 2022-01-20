import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { LatestArticlesComponent } from './components/latest-articles/latest-articles.component';
import { FeaturedArticlesComponent } from './components/featured-articles/featured-articles.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CreateArticlesComponent } from './components/create-articles/create-articles.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailsComponent,
    LatestArticlesComponent,
    FeaturedArticlesComponent,
    MyArticlesComponent,
    CategoriesComponent,
    CreateArticlesComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LatestArticlesComponent],
})
export class ArticlesModule {}
