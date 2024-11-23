import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/shared/services/topic.service';
import { Topic } from 'src/app/shared/models/topic.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  model: AddCategoryRequest;
  topics$?: Observable<Topic[]>;

  private addCategorySubscription?: Subscription;

  constructor(
    private categoryService: CategoryService,
    private topicService: TopicService,
    private router: Router
  ) {
    this.model = {
      name: '',
      urlHandle: '',
      topicId: ''
    };
  }

  // need to work
  ngOnInit(): void {
    this.topics$ = this.topicService.getAllTopics();
  }

  onFormSubmit() {
    this.addCategorySubscription = this.categoryService
      .addCategory(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        },
      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
