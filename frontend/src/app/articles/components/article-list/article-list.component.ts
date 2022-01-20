import { Component, OnDestroy, OnInit } from '@angular/core';
import { Articles } from '../../models/articles.model';
import { ArticlesService } from '../../services/articles.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit{

  articles: Articles[] = [];
  isloading = false;
  error: any;
  userId: string = '';
  private articleSub: Subscription = new Subscription();
  constructor(private articleServices: ArticlesService) {}

  ngOnInit(): void {
    this.isloading = true;
    this.getErrors();
    this.articleServices.getArticles();
    console.log(this.articleServices.getArticles())
    this.articleSub = this.articleServices.getArticleUpdateListener().subscribe(
      (articles: Articles[]) => {
        this.articles = articles;
        this.sortArticleByDate(this.articles);
        console.log(this.articles);
        
        this.isloading = false;
      },
      (e) => {
        this.isloading = false;
        this.error = e;
      }
    );
  }
  
  sortArticleByDate(UnSortedArticle: Articles[]) {
    UnSortedArticle.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getErrors() {
    this.error = null;
    this.articleServices.err.subscribe((err) => {
      this.isloading = false;
      this.error = err;
    });
  }

  ngOnDestroy() {
    this.articleSub.unsubscribe();
  }


}
