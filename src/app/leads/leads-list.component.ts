import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { Lead } from './leads.model';
import { LeadsService } from './leads.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'av-leads-list',
  templateUrl: 'leads-list.component.html',
  styleUrls: ['leads-list.component.css']
})

export class LeadsListComponent implements OnInit {
  leads$!: Observable<Lead[]>;
  leads:any
  constructor(private leadsService: LeadsService,private toastr: ToastrService) { }

  ngOnInit(): void {
      this.leads$ = this.leadsService.getLeads();
      this.loadLeads()
  }

  loadLeads(): void {
    this.leadsService.getLeads().subscribe((leads) => {
      this.leads = leads;
  
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
  
  // Get All LoadPotentialDuplicates
  duplicatesMap: { [key: string]: any[] } = {};
  loadPotentialDuplicates(leadId: string): void {
    this.leadsService.getPotentialDuplicates(leadId).subscribe((duplicates) => {
      this.duplicatesMap[leadId] = duplicates;
      
    });
  }
  
  selectedMarkIndex: number = -1; 

  // Send Put Interface
  markAsActualDuplicate(lead: Lead) {
   
  if (this.selectedMarkIndex === -1) {
    this.toastr.warning('Please mark the lead first.');
    return;
}
    const { lead_id, duplicate_of, source, first_name, last_name, email, cell_phone, home_phone } = lead;
    this.leadsService.markDuplicateAsActual(lead_id, lead_id, duplicate_of, source, first_name, last_name, email, cell_phone, home_phone).subscribe(
        () =>{
          this.toastr.success('success');
          this.ngOnInit()
        },(error) => console.error('Error marking as actual duplicate:', error)
    );
}
// Mark Button
toggleMark(index: number) {
  if (this.selectedMarkIndex === index) {
      this.selectedMarkIndex = -1; 
  } else {
      this.selectedMarkIndex = index;
  }
}


}
