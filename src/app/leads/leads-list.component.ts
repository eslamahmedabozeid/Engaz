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
  duplicates:any
  constructor(private leadsService: LeadsService) { }

  ngOnInit(): void {
      this.leads$ = this.leadsService.getLeads();
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
