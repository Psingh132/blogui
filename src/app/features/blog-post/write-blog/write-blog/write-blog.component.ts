import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../../models/add-blog-post.model';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/features/category/models/category.model';
import { BlogPostService } from '../../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/features/category/services/category.service';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css'],
})
export class WriteBlogComponent implements OnInit, OnDestroy {
  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;

  imageSelectorSubscription?: Subscription;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private authService: AuthService
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: [],
    };
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectorSubscription = this.imageService
      .onSelectImage()
      .subscribe({
        next: (selectedImage) => {
          this.model.featuredImageUrl = selectedImage.url;
          this.closeImageSelector();
        },
      });
  }

  onFormSubmit(): void {
    const currentUser = this.authService.getUser(); // Get current user
    this.model.author = currentUser?.name;

    this.blogPostService.createBlogPostUser(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('');
      },
    });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}
