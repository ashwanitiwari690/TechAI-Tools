import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';
import { CopyButton } from '../../../../shared/components/copy-button/copy-button';
import { Alert } from '../../../../shared/components/alert/alert';

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

function parseHex(hex: string): RgbColor | null {
  const clean = hex.trim().replace(/^#/, '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    return null;
  }
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16)
  };
}

function rgbToHex({ r, g, b }: RgbColor): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

function rgbToHsl({ r, g, b }: RgbColor): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = ((gn - bn) / d) % 6;
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

@Component({
  selector: 'app-color-converter',
  imports: [ToolLayout, CopyButton, Alert],
  templateUrl: './color-converter.html'
})
export class ColorConverter {
  readonly hexInput = signal('#4f46e5');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('color-converter');

  readonly parsed = computed(() => parseHex(this.hexInput()));

  readonly rgbString = computed(() => {
    const rgb = this.parsed();
    return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '';
  });

  readonly hslString = computed(() => {
    const rgb = this.parsed();
    if (!rgb) return '';
    const hsl = rgbToHsl(rgb);
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  });

  readonly hexNormalized = computed(() => {
    const rgb = this.parsed();
    return rgb ? rgbToHex(rgb) : '';
  });

  setFromPicker(value: string): void {
    this.hexInput.set(value);
  }

  readonly howToUse = [
    'Type a HEX color code (e.g. #4f46e5) or use the color picker.',
    'RGB and HSL equivalents are calculated instantly.',
    'Copy whichever format you need for your CSS or design tool.'
  ];

  readonly example = { input: '#4f46e5', output: 'rgb(79, 70, 229) · hsl(243, 75%, 59%)' };

  readonly useCases = ['Converting a design tool\'s HEX color into CSS-ready RGB or HSL', 'Understanding a color\'s hue, saturation and lightness for theming', 'Quickly checking what a HEX code looks like'];

  readonly benefits = ['Converts HEX to RGB and HSL simultaneously', 'Includes a visual color picker', 'Accepts both 3- and 6-digit HEX codes'];

  readonly limitations = ['Does not currently support named CSS colors (e.g. "rebeccapurple") or alpha/transparency values as input.'];

  readonly faq: FaqItem[] = [
    {
      question: 'What is the difference between RGB and HSL?',
      answer:
        'RGB describes a color by red, green and blue light intensity, while HSL describes it by hue, saturation and lightness — often more intuitive for adjusting a color\'s shade or brightness.'
    },
    {
      question: 'Does this tool support 3-digit HEX codes like #fff?',
      answer: 'Yes, short 3-digit HEX codes are automatically expanded to their 6-digit equivalent before conversion.'
    }
  ];
}
