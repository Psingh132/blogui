import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model = {
    username: '',
    email: '',
    password: '',
    name: '',
  };
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onRegisterSubmit() {
    this.isLoading = true;
    this.authService.register(this.model).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastr.success(
          'Registration successful! Redirecting to login page...'
        );
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Email already registered.');
      },
    });
  }
}
