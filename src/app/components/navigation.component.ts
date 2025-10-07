import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type NavItem = {
  rota: string;
  nome: string;
};

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="w-full">
      <div class="flex gap-2">
        @for (item of items; track item.rota) {
        <a
          [routerLink]="item.rota"
          routerLinkActive="bg-blue-50 text-blue-700 border-blue-200"
          class="block rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          [attr.aria-label]="item.nome"
        >
          {{ item.nome }}
        </a>
        }
      </div>
    </nav>
  `,
})
export class NavigationComponent {
  @Input({ required: true }) items: NavItem[] = [];
}
