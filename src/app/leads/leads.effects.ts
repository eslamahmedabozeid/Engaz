import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { LeadsService } from './leads.service';
import { LeadsActions } from './leads.actions';
import { of as observableOf } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Lead } from './leads.model';
import { Action } from '@ngrx/store';

@Injectable()
export class LeadsEffects {
  constructor(private actions$: Actions, private leadsService: LeadsService) {}

  fetchLeadsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadsActions.fetch),
      switchMap(() => {
        return this.leadsService.fetchLeadsList().pipe(
          map((leads: Lead[]) => LeadsActions.receive({ leads })),
          catchError((error: string) => observableOf(LeadsActions.receiveFailed({ error })))
        );
      })
    ),
    { dispatch: false }
  );
}
