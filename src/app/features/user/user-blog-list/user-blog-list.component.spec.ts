import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlogListComponent } from './user-blog-list.component';

describe('UserBlogListComponent', () => {
  let component: UserBlogListComponent;
  let fixture: ComponentFixture<UserBlogListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBlogListComponent]
    });
    fixture = TestBed.createComponent(UserBlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
