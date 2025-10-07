import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private supabaseService: SupabaseService) {}

  async listOrdersForCurrentUser() {
    const session = await this.supabaseService.getSession();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }

    const { data, error } = await this.supabaseService.client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    console.log('data', data);
    return data ?? [];
  }
}
