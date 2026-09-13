import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoMark } from '../../shared/components/logo-mark/logo-mark';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, LogoMark],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  readonly year = new Date().getFullYear();
}
