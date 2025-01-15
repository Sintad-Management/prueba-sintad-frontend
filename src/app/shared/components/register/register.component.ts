import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthenticationApiService } from '../../../core/services/authentication-api.service';
import {Router, RouterLink} from '@angular/router';
import { User } from '../../../core/models/user.model';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public user: User = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthenticationApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.signUp(this.user).subscribe(
      () => {
        this.notificationService.showSuccess('Usuario registrado con éxito en el sistema');
        this.redirectToLogin();
      },
      () => {
        this.notificationService.showError('Ha ocurrido un error en el sistema !!');
      }
    );
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
