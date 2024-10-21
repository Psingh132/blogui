import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private httpClient : HttpClient) { }

  createBlogPost(data: AddBlogPost) : Observable<BlogPost> {
    return this.httpClient.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts`, data);
  }

  getAllBlogPosts() : Observable<BlogPost[]> {
    return this.httpClient.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }
}
