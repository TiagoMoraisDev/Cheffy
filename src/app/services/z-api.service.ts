import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SendTextPayload {
  phone: string;
  message: string;
}

interface SendTextResponse {
  // Shape based on Z-API typical responses; adjust if needed
  messageId?: string;
  status?: string;
  error?: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class ZApiService {
  private readonly http = inject(HttpClient);

  private readonly instanceId = '3E845C7342675171FE9A5A226D180D79';
  private readonly instanceToken = '4515045D509F5885358288CF';
  private readonly clientToken = 'Fe74cdea123d445fca219a6a0bd7a8cc2S';
  private readonly baseUrl = `https://api.z-api.io/instances/${this.instanceId}/token/${this.instanceToken}`;

  private readonly defaultPhone = '557398031529';

  sendText(
    message: string,
    phone: string = this.defaultPhone
  ): Observable<SendTextResponse> {
    const url = `${this.baseUrl}/send-text`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Client-Token': this.clientToken,
    });

    const payload: SendTextPayload = {
      phone,
      message,
    };

    return this.http.post<SendTextResponse>(url, payload, { headers });
  }
}
