import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPostHome } from '../../blog-post/models/blog-post-home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<BlogPostHome[]>;
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 12;
  queryText: string = '';

  constructor(private blogPostService: BlogPostService) {}
  ngOnInit(): void {
    this.blogPostService.getBlogPostCount().subscribe({
      next: (value) => {
        this.totalCount = value;
        this.list = new Array(Math.ceil(value / this.pageSize));

        this.blogs$ = this.blogPostService.getAllBlogPostsHome(
          undefined,
          this.pageNumber,
          this.pageSize
        );
      },
    });
  }

  onSearch(query: string) {
    this.blogPostService.getAllBlogPostsHome(query).subscribe({
      next: (response) => {
        this.blogs$ = of(response);
      },
      error: (error) => {
        console.error('Error fetching blog posts:', error);
      }
    });
  }
}
