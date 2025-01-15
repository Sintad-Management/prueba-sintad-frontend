import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationApiService } from '../../../core/services/authentication-api.service';
import { NotificationService } from '../../service/notification.service';
import {NgIf} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Usamos el operador de afirmación no nula

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.notificationService.showError('El formulario contiene errores');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.signIn(email, password).subscribe(
      () => {
        this.notificationService.showSuccess('Inicio de sesión exitoso');
        this.router.navigate(['/entidades']);
      },
      (error: HttpErrorResponse) => {
        console.log('Error recibido:', error);
        if (error.status === 401) {
          console.log('Contenido de error.error:', JSON.stringify(error.error, null, 2));
          const errorMessage = error.error?.message || 'Email o contraseña incorrectos';
          this.notificationService.showError(errorMessage);
        } else {
          this.notificationService.showError('Ha ocurrido un error en el sistema');
        }
      }
    );
  }
}
