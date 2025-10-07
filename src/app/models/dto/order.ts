export interface OrderDto {
  id: number;
  created_at: string;
  client_name: string;
  localization: string;
  value: number;
  user_uuid: string;
  status: 'received' | 'accepted' | 'ready' | 'for_delivery';
  phone: string;
}
