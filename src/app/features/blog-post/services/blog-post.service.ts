import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { BlogPostList } from '../models/blog-post-list.model';
import { BlogPostHome } from '../models/blog-post-home.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private httpClient : HttpClient) { }

  createBlogPost(data: AddBlogPost) : Observable<BlogPost> {
    return this.httpClient.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts?addAuth=true`, data);
  }

  getAllBlogPostsList() : Observable<BlogPostList[]> {
    return this.httpClient.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts/bloglist`);
  }

  getAllBlogPostsHome() : Observable<BlogPostHome[]> {
    return this.httpClient.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts/homepage`);
  }


  getBlogPostById(id:string): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  getBlogPostByUrlHandle(urlHandle:string): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`);
  }

  updateBlogPost(id:string, updateBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.httpClient.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`, updateBlogPost);
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.httpClient.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`);
  }
}
