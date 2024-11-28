import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: LoginRequest;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.model = {
      email: '',
      password: '',
    };
  }

  onFormSubmit(): void {
    this.isLoading = true;
    this.authService.login(this.model).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toaster.success('Login Successfull!');
        // Set Auth Cookie
        this.cookieService.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );

        // Set User
        this.authService.setUser({
          email: response.email,
          roles: response.roles,
          name: response.name,
        });

        // Redirect to intended route or home
        const redirectUrl = this.authService.getRedirectUrl() || '/';
        this.authService.clearRedirectUrl();
        this.router.navigateByUrl(redirectUrl);
      },
      error: () => {
        this.isLoading = false;
        this.toaster.error('Email or Password is incorrect.');
      },
    });
  }

  fillAdminCredentials() {
    this.model.email = 'admin@gmail.com';
    this.model.password = 'Admin@123';
  }
}
