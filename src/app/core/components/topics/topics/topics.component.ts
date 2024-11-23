import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Topic } from 'src/app/shared/models/topic.model';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  user?: User;
  topics$?: Observable<Topic[]>;

  constructor(public authService: AuthService, private topicService: TopicService) {}

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      },
    });

    this.user = this.authService.getUser();
    this.topics$ = this.topicService.getAllTopics();
  }
  

}
