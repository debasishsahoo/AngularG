import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArticlesComponent } from './featured-articles.component';

describe('FeaturedArticlesComponent', () => {
  let component: FeaturedArticlesComponent;
  let fixture: ComponentFixture<FeaturedArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
