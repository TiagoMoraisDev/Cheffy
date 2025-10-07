// dialog.component.ts
import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ModalButtonComponent } from './modal-button.component';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [ModalButtonComponent],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h2 class="text-xl font-bold mb-4">Confirmação</h2>
      <p>{{ data?.mensagem }}</p>

      <div class="flex justify-end mt-4 gap-2">
        <app-modal-button
          label="Não"
          (click)="close('nao')"
          variant="secondary"
        />
        <app-modal-button label="Sim" (click)="close('sim')" />
      </div>
    </div>
  `,
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  close(result: string) {
    this.dialogRef.close(result);
  }
}
