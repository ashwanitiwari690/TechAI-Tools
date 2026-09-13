import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class ToastContainer {
  protected readonly toastService = inject(ToastService);
}
