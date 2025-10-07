import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ZApiService } from '../services/z-api.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

type Order = {
  id: number;
  title: string;
  description?: string;
};

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Pedidos</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Coluna: Recebido -->
        <div class="bg-white rounded-lg border shadow-sm">
          <div
            class="px-4 py-3 border-b bg-yellow-50 text-yellow-800 font-semibold rounded-t-lg"
          >
            Recebido
          </div>
          <div class="p-4 space-y-3 min-h-40">
            <div *ngIf="recebidos.length === 0" class="text-sm text-gray-500">
              Sem pedidos
            </div>
            <div
              *ngFor="let pedido of recebidos"
              class="border rounded-lg p-3 bg-white shadow-sm"
            >
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="font-medium">{{ pedido.title }}</div>
                  <div class="text-sm text-gray-500">#{{ pedido.id }}</div>
                  <div
                    *ngIf="pedido.description"
                    class="text-sm text-gray-600 mt-1"
                  >
                    {{ pedido.description }}
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <button
                  (click)="confirmarAceitarPedido(pedido.id)"
                  class="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-md"
                >
                  Aceitar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna: Em preparo -->
        <div class="bg-white rounded-lg border shadow-sm">
          <div
            class="px-4 py-3 border-b bg-blue-50 text-blue-800 font-semibold rounded-t-lg"
          >
            Em preparo
          </div>
          <div class="p-4 space-y-3 min-h-40">
            <div *ngIf="emPreparo.length === 0" class="text-sm text-gray-500">
              Nenhum pedido em preparo
            </div>
            <div
              *ngFor="let pedido of emPreparo"
              class="border rounded-lg p-3 bg-white shadow-sm"
            >
              <div>
                <div class="font-medium">{{ pedido.title }}</div>
                <div class="text-sm text-gray-500">#{{ pedido.id }}</div>
                <div
                  *ngIf="pedido.description"
                  class="text-sm text-gray-600 mt-1"
                >
                  {{ pedido.description }}
                </div>
              </div>
              <div class="mt-3">
                <button
                  (click)="confirmarFinalizarPreparo(pedido.id)"
                  class="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-2 rounded-md"
                >
                  Finalizar Preparo
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna: Feitos -->
        <div class="bg-white rounded-lg border shadow-sm">
          <div
            class="px-4 py-3 border-b bg-green-50 text-green-800 font-semibold rounded-t-lg"
          >
            Feitos
          </div>
          <div class="p-4 space-y-3 min-h-40">
            <div *ngIf="feitos.length === 0" class="text-sm text-gray-500">
              Ainda não há pedidos finalizados
            </div>
            <div
              *ngFor="let pedido of feitos"
              class="border rounded-lg p-3 bg-white shadow-sm"
            >
              <div>
                <div class="font-medium">{{ pedido.title }}</div>
                <div class="text-sm text-gray-500">#{{ pedido.id }}</div>
                <div
                  *ngIf="pedido.description"
                  class="text-sm text-gray-600 mt-1"
                >
                  {{ pedido.description }}
                </div>
              </div>
              <div class="mt-2 text-xs text-gray-500">Concluído</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanComponent {
  private dialog = inject(Dialog);
  private cdr = inject(ChangeDetectorRef);
  private zApiService = inject(ZApiService);

  recebidos: Order[] = [
    { id: 101, title: 'Pedido 101', description: '2x Hamburguer, 1x Suco' },
    { id: 102, title: 'Pedido 102', description: '1x Pizza Margherita' },
    { id: 103, title: 'Pedido 103', description: '3x Pastel, 2x Refrigerante' },
  ];

  emPreparo: Order[] = [];
  feitos: Order[] = [];

  confirmarAceitarPedido(orderId: number) {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      data: { mensagem: 'Tem certeza que deseja aceitar este pedido?' },
      backdropClass: 'bg-black/70',
    });

    ref.closed
      .pipe(
        switchMap((result) => {
          if (result === 'sim') {
            this.aceitarPedido(orderId);
            return this.zApiService.sendText(`Pedido ${orderId} aceito!`);
          }
          return of(null);
        })
      )
      .subscribe();
  }

  aceitarPedido(orderId: number): void {
    const index = this.recebidos.findIndex((o) => o.id === orderId);
    if (index !== -1) {
      const [pedido] = this.recebidos.splice(index, 1);
      this.emPreparo.push(pedido);
      this.cdr.detectChanges();
    }
  }

  confirmarFinalizarPreparo(orderId: number) {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      data: { mensagem: 'Tem certeza que deseja finalizar o preparo?' },
      backdropClass: 'bg-black/70',
    });
    ref.closed
      .pipe(
        switchMap((result) => {
          if (result === 'sim') {
            this.finalizarPreparo(orderId);
            return this.zApiService.sendText(`Pedido ${orderId} finalizado!`);
          }
          // Se não for 'sim', retorna um observable vazio
          return of(null);
        })
      )
      .subscribe();
  }

  finalizarPreparo(orderId: number): void {
    const index = this.emPreparo.findIndex((o) => o.id === orderId);
    if (index !== -1) {
      const [pedido] = this.emPreparo.splice(index, 1);
      this.feitos.push(pedido);
      this.cdr.detectChanges();
    }
  }
}
