import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  model: AddCategoryRequest;

  private addCategorySubscription?: Subscription;

  constructor(
    private categoryService: CategoryService,
    private topicService: TopicService,
    private router: Router
  ) {
    this.model = {
      name: '',
      urlHandle: '',
    };
  }

  // need to work
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loadTopics(): void {
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
