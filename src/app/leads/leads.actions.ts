import { createAction, props } from '@ngrx/store';
import { Lead } from './leads.model';

export namespace LeadsActions {
  export const fetch = createAction('[leads] fetch leads list');
  export const receive = createAction('[leads] receive leads list', props<{ leads: Lead[] }>());
  export const receiveFailed = createAction('[leads] failed to receive leads list', props<{ error: string }>());
  export const selectById = createAction('[leads] select lead to deduplicate', props<{ lead_id: string }>());
}