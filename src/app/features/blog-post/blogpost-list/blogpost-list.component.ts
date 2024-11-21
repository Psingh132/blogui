import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPostList } from '../models/blog-post-list.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css'],
})
export class BlogpostListComponent implements OnInit {
  blogPost$?: Observable<BlogPostList[]>;
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 10;

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit(): void {
    this.blogPostService.getBlogPostCount().subscribe({
      next: (value) => {
        this.totalCount = value;
        this.list = new Array(Math.ceil(value / this.pageSize));

        this.blogPost$ = this.blogPostService.getAllBlogPostsList(
          this.pageNumber,
          this.pageSize
        );
      },
    });
    this.blogPost$ = this.blogPostService.getAllBlogPostsList();
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;

    this.blogPost$ = this.blogPostService.getAllBlogPostsList(
      this.pageNumber,
      this.pageSize
    );
  }

  getNextPage() {
    if (this.pageNumber + 1 > this.list.length) {
      return;
    }

    this.pageNumber += 1;
    this.blogPost$ = this.blogPostService.getAllBlogPostsList(
      this.pageNumber,
      this.pageSize
    );
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }

    this.pageNumber -= 1;
    this.blogPost$ = this.blogPostService.getAllBlogPostsList(
      this.pageNumber,
      this.pageSize
    );
  }
}
