import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showSuccess(message: string) {
    Swal.fire({
      title: 'Éxito',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  showError(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
