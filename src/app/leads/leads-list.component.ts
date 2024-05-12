import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lead } from './leads.model';
import { LeadsService } from './leads.service';


@Component({
  selector: 'av-leads-list',
  templateUrl: 'leads-list.component.html',
  styleUrls: ['leads-list.component.css']
})

export class LeadsListComponent implements OnInit {
  leads$!: Observable<Lead[]>;
  leads:any
  constructor(private leadsService: LeadsService) { }

  ngOnInit(): void {
      this.leads$ = this.leadsService.getLeads();
      this.loadLeads()
  }

  loadLeads(): void {
    this.leadsService.getLeads().subscribe((leads) => {
      this.leads = leads;
      console.log(this.leads);
  
      // Use Set to store the lead_ids encountered so far
      const leadIdsSet = new Set<string>();
  
      // Check for duplicate lead_ids
      let hasDuplicate = false;
      this.leads.forEach((item: any) => {
        if (leadIdsSet.has(item.lead_id)) {
          hasDuplicate = true;
          return; // Exit the loop if a duplicate is found
        }
        leadIdsSet.add(item.lead_id);
      });
  
      if (hasDuplicate) {
        console.log('Duplicate lead_ids found.');
      } else {
        console.log('No duplicate lead_ids found.');
      }
    });
  }
  

  duplicatesMap: { [key: string]: any[] } = {};
  loadPotentialDuplicates(leadId: string): void {
    this.leadsService.getPotentialDuplicates(leadId).subscribe((duplicates) => {
      this.duplicatesMap[leadId] = duplicates;
    });
  }
  

  markAsActualDuplicate(leadId: string, duplicateId: string) {
    this.leadsService.markDuplicateAsActual(leadId, duplicateId).subscribe(
        (res) => {
           console.log(res)
           this.ngOnInit()
        },
        (error) => {
          console.log(error)  
        }
    );
}
}
