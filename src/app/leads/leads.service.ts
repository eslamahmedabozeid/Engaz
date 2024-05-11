import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lead } from './leads.model';

@Injectable({
    providedIn: 'root'
})
export class LeadsService {
  fetchLeadsList(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiUrl);
  }
    private apiUrl = 'http://localhost:3000/api/leads'; 
    
    constructor(private http: HttpClient) { }

    getLeads(): Observable<Lead[]> {
        return this.http.get<Lead[]>(this.apiUrl);
    }

    markDuplicateAsActual(leadId: string, duplicateId: string): Observable<any> {
      const url = `${this.apiUrl}/${leadId}`;
      return this.http.put(url, { lead_id: duplicateId });
  }
  
}
