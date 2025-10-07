import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from './components/dialog.component';
import { NavigationComponent } from './components/navigation.component';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from '../app/services/supabase.service';
import { AuthComponent } from './pages/auth/auth.component';
import { AccountComponent } from './pages/account/account.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DialogModule,
    NavigationComponent,
    RouterOutlet,
    AuthComponent,
    AccountComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('true-delivery');
  protected readonly cd = inject(ChangeDetectorRef);

  session: any;
  async ngOnInit() {
    this.session = await this.supabase.getSession();
    this.supabase.authChanges((_, session) => {
      this.session = session;
      this.cd.detectChanges();
    });
    this.cd.detectChanges();
  }

  navItems = [
    { rota: '/', nome: 'Painel' },
    { rota: '/historico', nome: 'Histórico' },
    { rota: '/gerenciar-menu', nome: 'Gerenciar Menu' },
  ];

  constructor(
    private dialog: Dialog,
    private readonly supabase: SupabaseService
  ) {}

  abrirDialog() {
    const ref = this.dialog.open(DialogComponent, {
      data: { mensagem: 'Esse é o conteúdo do dialog via CDK!' },
      backdropClass: 'bg-black/70',
    });

    ref.closed.subscribe((result) => {
      console.log('Dialog fechado com:', result);
    });
  }
}
