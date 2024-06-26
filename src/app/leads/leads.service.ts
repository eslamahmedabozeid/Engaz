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
    getPotentialDuplicates(leadId: string): Observable<any> {
      return this.http.get(this.apiUrl + `/${leadId}/potential-duplicates`);
  }


  markDuplicateAsActual(leadId: string, duplicateId: string, duplicate_of: string, source: string, first_name: string, last_name: string, email: string, cell_phone: string, home_phone: string): Observable<any> {
    const url = `${this.apiUrl}/${leadId}`;
    return this.http.put(url, { lead_id: duplicateId, duplicate_of, source, first_name, last_name, email, cell_phone, home_phone });
}

  
}
