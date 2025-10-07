import { Component, inject } from '@angular/core';
import { KanbanComponent } from '../../components/kanban.component';
import { OrderService } from '../../services/order.service';
import { OrderDto } from '../../models/dto/order';

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
