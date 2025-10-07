import { Component } from '@angular/core';
import { KanbanComponent } from '../../components/kanban.component';
import { ButtonComponent } from '../../components/button.component';
import { ModalButtonComponent } from '../../components/modal-button.component';

@Component({
  selector: 'app-painel',
  imports: [KanbanComponent],
  template: `
    <div class="p-4">
      <app-kanban></app-kanban>
    </div>
  `,
})
export class PainelComponent {}
