import { createReducer, on } from '@ngrx/store';
import { LeadsActions } from './leads.actions';
import { Lead } from './leads.model';

const initial_state: Lead[] = [];

export const leadsReducer = createReducer(
  initial_state,
  on(LeadsActions.receive, (leads, action) => {
    return action.leads;
  })
);