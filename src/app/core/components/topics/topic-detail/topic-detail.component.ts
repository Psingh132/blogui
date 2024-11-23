import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostHome } from 'src/app/features/blog-post/models/blog-post-home.model';
import { BlogPostService } from 'src/app/features/blog-post/services/blog-post.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
})
export class TopicDetailComponent implements OnInit {
  id: string | null = null;
  routeSubscription?: Subscription;

  blogs$?: Observable<BlogPostHome[]>;

  constructor(
    private blogPostService: BlogPostService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // to get the id from route
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // get blogpost from api
        if (this.id) {
          this.blogs$ = this.blogPostService.getTopicBlogPost(this.id);
        }
      },
    });
  }
}
