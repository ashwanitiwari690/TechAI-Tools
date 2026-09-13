import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tool-input',
  imports: [FormsModule],
  templateUrl: './tool-input.html',
  styleUrl: './tool-input.scss'
})
export class ToolInput {
  readonly label = input<string>('Input');
  readonly placeholder = input<string>('');
  readonly rows = input<number>(10);
  readonly value = model<string>('');
  readonly loadExample = output<void>();
  readonly hasExample = input<boolean>(false);

  clear(): void {
    this.value.set('');
  }
}
