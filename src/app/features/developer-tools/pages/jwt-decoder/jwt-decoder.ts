import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { ToolOutput } from '../../components/tool-output/tool-output';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

const EXAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzAwMDAwMDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function base64UrlDecode(segment: string): string {
  const padded = segment.replace(/-/g, '+').replace(/_/g, '/');
  const withPadding = padded + '='.repeat((4 - (padded.length % 4)) % 4);
  return decodeURIComponent(escape(atob(withPadding)));
}

@Component({
  selector: 'app-jwt-decoder',
  imports: [ToolLayout, ToolInput, ToolOutput],
  templateUrl: './jwt-decoder.html'
})
export class JwtDecoder {
  readonly input = signal('');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('jwt-decoder');

  readonly result = computed<{ header: string; payload: string; error: string | null }>(() => {
    const raw = this.input().trim();
    if (!raw) {
      return { header: '', payload: '', error: null };
    }
    const parts = raw.split('.');
    if (parts.length !== 3) {
      return { header: '', payload: '', error: 'This does not look like a JWT — expected 3 dot-separated segments (header.payload.signature).' };
    }
    try {
      const header = JSON.stringify(JSON.parse(base64UrlDecode(parts[0])), null, 2);
      const payload = JSON.stringify(JSON.parse(base64UrlDecode(parts[1])), null, 2);
      return { header, payload, error: null };
    } catch {
      return { header: '', payload: '', error: 'Could not decode this token — the header or payload segment is not valid Base64URL-encoded JSON.' };
    }
  });

  readonly howToUse = [
    'Paste a full JWT (three dot-separated segments) into the input box.',
    'The decoded header and payload appear automatically as JSON.',
    'Use the copy buttons to grab either section.'
  ];

  readonly example = {
    input: EXAMPLE_JWT,
    output: '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1700000000\n}'
  };

  readonly useCases = [
    'Inspecting the claims inside an access or ID token while debugging auth',
    'Checking token expiry (exp) or issued-at (iat) values',
    'Understanding what data a third-party JWT actually contains'
  ];

  readonly benefits = ['Decodes header and payload instantly, entirely client-side', 'No token data is ever sent to a server', 'Pretty-prints the resulting JSON for readability'];

  readonly limitations = [
    'This tool only decodes a JWT — it does NOT verify the cryptographic signature, so it cannot tell you whether a token is authentic or has been tampered with.',
    'Never paste a real production access token into any third-party website, including this one, if you are concerned about exposure — decoding is safe locally, but treat tokens as sensitive.'
  ];

  readonly faq: FaqItem[] = [
    {
      question: 'Does this tool verify the JWT signature?',
      answer:
        'No. It only decodes the header and payload, which are just Base64URL-encoded JSON and not encrypted. Verifying a signature requires the secret or public key and should be done on a trusted backend.'
    },
    {
      question: 'Is it safe to paste my JWT here?',
      answer:
        'Decoding happens entirely in your browser and nothing is transmitted anywhere. That said, as a general security habit, avoid pasting live production tokens into any web tool unless you trust it and understand it runs locally.'
    },
    {
      question: 'Why did decoding fail?',
      answer: 'Make sure you pasted the complete token with all three segments separated by dots, and that it has not been truncated or modified.'
    }
  ];

  loadExample(): void {
    this.input.set(EXAMPLE_JWT);
  }
}
