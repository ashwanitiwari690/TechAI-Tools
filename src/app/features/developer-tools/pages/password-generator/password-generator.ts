import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';
import { CopyButton } from '../../../../shared/components/copy-button/copy-button';
import { Badge } from '../../../../shared/components/badge/badge';

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS = /[il1LoO0]/;

@Component({
  selector: 'app-password-generator',
  imports: [ToolLayout, CopyButton, Badge],
  templateUrl: './password-generator.html'
})
export class PasswordGenerator {
  readonly length = signal(16);
  readonly includeUpper = signal(true);
  readonly includeLower = signal(true);
  readonly includeDigits = signal(true);
  readonly includeSymbols = signal(true);
  readonly excludeAmbiguous = signal(false);
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('password-generator');

  readonly password = signal('');

  constructor() {
    this.generate();
  }

  readonly strength = computed<{ label: string; tone: 'danger' | 'warning' | 'success' }>(() => {
    const len = this.length();
    const variety = [this.includeUpper(), this.includeLower(), this.includeDigits(), this.includeSymbols()].filter(Boolean).length;
    const score = len * variety;
    if (score < 32) return { label: 'Weak', tone: 'danger' };
    if (score < 64) return { label: 'Good', tone: 'warning' };
    return { label: 'Strong', tone: 'success' };
  });

  setLength(value: string): void {
    this.length.set(Math.min(Math.max(Number(value) || 8, 4), 128));
  }

  generate(): void {
    let pool = '';
    if (this.includeLower()) pool += LOWER;
    if (this.includeUpper()) pool += UPPER;
    if (this.includeDigits()) pool += DIGITS;
    if (this.includeSymbols()) pool += SYMBOLS;

    if (this.excludeAmbiguous()) {
      pool = pool
        .split('')
        .filter((c) => !AMBIGUOUS.test(c))
        .join('');
    }

    if (!pool) {
      this.password.set('');
      return;
    }

    const array = new Uint32Array(this.length());
    crypto.getRandomValues(array);
    const result = Array.from(array, (n) => pool[n % pool.length]).join('');
    this.password.set(result);
  }

  readonly howToUse = [
    'Choose a password length and which character types to include.',
    'Click "Generate password" to create a new random password.',
    'Copy it directly into your password manager — avoid reusing passwords across sites.'
  ];

  readonly example = { input: 'Length 16, all character types', output: 'k7#Rt2!qLm9@Xw4Z' };

  readonly useCases = ['Creating a strong password for a new account', 'Generating a temporary password for a shared service', 'Producing test credentials for development environments'];

  readonly benefits = ['Uses the cryptographically secure crypto.getRandomValues API', 'Full control over length and character types', 'Generated locally — never transmitted anywhere'];

  readonly limitations = ['A strong random password is only as safe as how you store it — use a reputable password manager rather than plain text notes.'];

  readonly faq: FaqItem[] = [
    {
      question: 'Are these passwords sent anywhere or logged?',
      answer: 'No. Generation happens entirely in your browser using the Web Crypto API, and nothing is transmitted or stored remotely.'
    },
    {
      question: 'What length should I use?',
      answer: 'For most accounts, 12–16 characters with a mix of character types provides strong protection; some sensitive accounts may warrant 20+ characters.'
    }
  ];
}
