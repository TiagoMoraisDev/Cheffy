// dialog.component.ts
import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h2 class="text-xl font-bold mb-4">Dialog Custom</h2>
      <p>{{ data?.mensagem }}</p>

      <div class="flex justify-end mt-4">
        <button (click)="close()" class="bg-gray-300 px-4 py-2 rounded">
          Fechar
        </button>
      </div>
    </div>
  `,
})
export class DialogComponent {
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close('Fechado com sucesso!');
  }
}
