import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPostHome } from '../../blog-post/models/blog-post-home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<BlogPostHome[]>;
  constructor(private blogPostService: BlogPostService) {

  }
  ngOnInit(): void {
    this.blogs$ = this.blogPostService.getAllBlogPostsHome();
  }
}