import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { CookieConsent } from './layout/cookie-consent/cookie-consent';
import { ToastContainer } from './shared/components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CookieConsent, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
