import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { BlogPostList } from '../models/blog-post-list.model';
import { BlogPostHome } from '../models/blog-post-home.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private httpClient: HttpClient) {}

  createBlogPost(data: AddBlogPost): Observable<BlogPost> {
    return this.httpClient.post<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts?addAuth=true`,
      data
    );
  }

  createBlogPostUser(data: AddBlogPost): Observable<BlogPost> {
    return this.httpClient.post<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/userblogpost?addAuth=true`,
      data
    );
  }

  getAllBlogPostsList(
    pageNumber?: number,
    pageSize?: number
  ): Observable<BlogPostList[]> {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.set('pageNumber', pageNumber);
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }
    return this.httpClient.get<BlogPost[]>(
      `${environment.apiBaseUrl}/api/blogposts/bloglist`,
      {
        params: params,
      }
    );
  }

  getAllBlogPostsHome(
    query?: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<BlogPostHome[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('query', query);
    }
    if (pageNumber) {
      params = params.set('pageNumber', pageNumber);
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }
    return this.httpClient.get<BlogPost[]>(
      `${environment.apiBaseUrl}/api/blogposts/homepage`,
      {
        params: params,
      }
    );
  }

  getTopicBlogPost(topicId: string): Observable<BlogPostHome[]> {
    return this.httpClient.get<BlogPostHome[]>(
      `${environment.apiBaseUrl}/api/blogposts/topicblogpost/${topicId}`
    );
  }

  getBlogPostCount(): Observable<number> {
    return this.httpClient.get<number>(
      `${environment.apiBaseUrl}/api/blogposts/count`
    );
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/${id}`
    );
  }

  getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/${urlHandle}`
    );
  }

  updateBlogPost(
    id: string,
    updateBlogPost: UpdateBlogPost
  ): Observable<BlogPost> {
    return this.httpClient.put<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`,
      updateBlogPost
    );
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.httpClient.delete<BlogPost>(
      `${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`
    );
  }
}
