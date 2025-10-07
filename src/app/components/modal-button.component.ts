import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-button',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <button [attr.type]="'button'" [disabled]="disabled" [class]="classes">
      <span>{{ label }}</span>
    </button>
  `,
})
export class ModalButtonComponent {
  @Input() label: string = '';
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
