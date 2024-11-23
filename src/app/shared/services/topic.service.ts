import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private httpClient: HttpClient) { }

  getAllTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(
      `${environment.apiBaseUrl}/api/topics`
    );
  }
}
