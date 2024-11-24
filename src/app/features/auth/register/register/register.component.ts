import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  onRegisterSubmit() {
    this.authService.register(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/login');
      },
    });
  }
}
