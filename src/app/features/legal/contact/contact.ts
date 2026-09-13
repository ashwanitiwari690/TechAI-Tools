import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { Button } from '../../../shared/components/button/button';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Breadcrumb, Button],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  private readonly fb = inject(FormBuilder);

  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'Contact' }];
  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor() {
    inject(SeoService).update({
      title: 'Contact',
      description: 'Get in touch with the TechAI Tools team with questions, suggestions or corrections.',
      canonicalPath: '/contact'
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.set(true);
    this.form.reset();
  }

  field(name: 'name' | 'email' | 'subject' | 'message') {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }
}
