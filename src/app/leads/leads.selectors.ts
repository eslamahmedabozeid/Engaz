import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Lead } from './leads.model';

export namespace LeadsSelectors {
  export const getLeadsList = createFeatureSelector<Lead[]>('leads');
}