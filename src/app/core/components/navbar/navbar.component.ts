import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: User;
  showButtons: boolean = true;

  constructor(private authService: AuthService,
    private router: Router) {
  }


  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        this.showButtons = !(currentRoute === '/login' || currentRoute === '/register');
      }
    });

  }

  onLogout(): void {
    this.authService.logout();
    this.user = undefined;
    this.router.navigateByUrl('/');
  }

}
