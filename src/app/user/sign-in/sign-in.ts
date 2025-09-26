import { Component } from '@angular/core';
import { IUserCredentials } from '../user.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bot-sign-in',
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css'],
  imports: [FormsModule, CommonModule]
})
export class SignIn {
  credentials: IUserCredentials = { email: '', password: '' };
  singInError: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  signIn() {
    this.singInError = false;
    this.userService.signIn(this.credentials).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: () => this.singInError = true
    });
  }
}
