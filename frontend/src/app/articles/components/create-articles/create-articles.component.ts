import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Articles } from '../../models/articles.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-create-articles',
  templateUrl: './create-articles.component.html',
  styleUrls: ['./create-articles.component.css'],
})
export class CreateArticlesComponent implements OnInit {
  articledate: Date = new Date();
  form!: FormGroup;
  isLoading: boolean = false;
  imagePreview: string = '';
  article: Articles | undefined;
  private mode = 'create';
  private url = '';
  private articleId: string | null = '';
  UserId: String | null = localStorage.getItem('userId');
  constructor(
    private articleServices: ArticlesService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.url = this.router.url.split('/')[1];
    if (this.url === 'edit') {
      this.articleId = this.router.url.split('/')[2];
      this.getPostById(this.articleId);
    }
    this.createForm();
  }
  getPostById(id: string) {
    this.isLoading = true;
    this.articleServices.getArticle(id).subscribe((articledata: any) => {
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
      this.imagePreview = articledata.post.image;
      this.form.setValue({
        title: this.article.title,
        body: this.article.body,
        image: this.article.image,
      });
      this.isLoading = false;
    });
  }
  createForm() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      body: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onSavePost() {
    this.articledate;
    if (this.form.invalid) {
      return;
    }
    const formData: any = {
      title: this.form.value.title,
      body: this.form.value.body,
      image: this.form.value.image,
      creatorid: this.UserId,
    };
    this.isLoading = true;
    if (this.url === 'edit') {
      formData.id = this.articleId;
      this.articleServices.updateArticle(formData);
    } else if (this.url === 'create') {
      this.articleServices.addArticle(formData);
    } else {
      return;
    }
    this.form.reset();
  }
}
