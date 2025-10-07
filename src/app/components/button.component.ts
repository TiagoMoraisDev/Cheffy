import { Component, Input } from '@angular/core';
// removed NgIf in favor of the new @if control flow
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <button [attr.type]="type" [disabled]="disabled" [class]="classes">
      @if (icon && iconPosition === 'start') {
      <mat-icon class="text-inherit">{{ icon }}</mat-icon>
      }
      <span>{{ label }}</span>
      @if (icon && iconPosition === 'end') {
      <mat-icon class="text-inherit">{{ icon }}</mat-icon>
      }
    </button>
  `,
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() icon?: string;
  @Input() iconPosition: 'start' | 'end' = 'start';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';

  get classes(): string {
    const baseClasses =
      'cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-colors';
    const widthClass = this.fullWidth ? ' w-full' : '';
    const variantClasses =
      this.variant === 'secondary'
        ? ' text-gray-800 bg-gray-200 hover:bg-gray-300'
        : ' text-white bg-blue-400 hover:bg-blue-500';
    return baseClasses + widthClass + variantClasses;
  }
}
