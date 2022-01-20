import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from '../../models/articles.model';
import { ArticlesService } from '../../services/articles.service';
import { AccountserviceService } from '../../../account/services/accountservice.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  isAuth = false;
  isLoading = false;
  article?: Articles;
  url: string = '';
  error: any;
  postId: string = '';
  userId: string | null = '';
  imagePreview: string = '';
  private authStatusSub?: Subscription;

  constructor(
    public articleServices: ArticlesService,
    public router: Router,
    public route: ActivatedRoute,
    public accountserviceService: AccountserviceService
  ) {}

  ngOnInit(): void {
    this.Authdata();
    this.getErrors();
    this.url = this.router.url.split('/')[1];
    //console.log('this.url:', this.url);

    if (this.url === 'article') {
      this.postId = this.router.url.split('/')[2];
      //console.log('this.postId:', this.postId);
      this.getPostById(this.postId);
    }
  }
  Authdata() {
    this.isAuth = this.accountserviceService.getIsAuth();
    console.log('this.isAuth :', this.isAuth);
    this.userId = this.accountserviceService.getUserId();
    console.log('this.userId:', this.userId);
    this.authStatusSub = this.accountserviceService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
        this.userId = this.accountserviceService.getUserId();
      });
  }
  getErrors() {
    this.error = null;
    this.articleServices.err.subscribe((err) => {
      this.error = err;
      this.isLoading = false;
    });
  }

  getPostById(id: string) {
    this.isLoading = true;
    this.articleServices.getArticle(id).subscribe((articledata: any) => {
      //console.log(articledata.post);
      this.article = {
        id: articledata.post._id,
        title: articledata.post.title,
        body: articledata.post.body,
        image: articledata.post.image,
        creatorid: articledata.post.createrid,
        creatername: articledata.post.creatername,
        createdAt: articledata.post.createdAt,
        like: articledata.post.like,
        isActive: articledata.post.isActive,
      };
      console.log('this.article:', this.article);
      this.imagePreview = articledata.post.image;
      this.isLoading = false;
    });
    (e: any) => {
      this.isLoading = false;
      this.error = e;
    };
  }

  onDeletePost(postId: string) {
    this.articleServices.deleteArticle(postId);
  }
}
