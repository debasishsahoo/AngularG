import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticlesComponent } from './create-articles.component';

describe('CreateArticlesComponent', () => {
  let component: CreateArticlesComponent;
  let fixture: ComponentFixture<CreateArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
