import { Component, inject } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [Button],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {
  constructor() {
    inject(SeoService).update({
      title: 'Page Not Found',
      description: 'The page you are looking for could not be found.',
      canonicalPath: '/404',
      noIndex: true
    });
  }
}
