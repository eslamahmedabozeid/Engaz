import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LeadsListComponent } from './leads-list.component';
import { LeadsEffects } from './leads.effects';
import { leadsReducer } from './leads.reducer';
import { LeadsService } from './leads.service';

@NgModule({
  declarations: [
    LeadsListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('leads', leadsReducer),
    EffectsModule.forFeature([LeadsEffects])
  ],
  providers: [
    LeadsService,
    LeadsEffects
  ],
})
export class LeadsModule {}