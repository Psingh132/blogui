import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPostList } from '../models/blog-post-list.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  blogPost$? : Observable<BlogPostList[]>;

  constructor(private blogPostService: BlogPostService) {}


  ngOnInit(): void {
    this.blogPost$ = this.blogPostService.getAllBlogPostsList();
  }

}
