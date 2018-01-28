import { Component, OnInit } from '@angular/core';
import { Comp2Component } from '../comp2/comp2';

import { AppState, State } from '../../core/app.reducer';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'comp1',
  templateUrl: 'comp1.html'
})
export class Comp1Component implements OnInit {

  stateSubscription: Subscription;
  appState: AppState;
  appState$: Observable<AppState>;

  constructor(private store: Store<State>) {
    this.appState$ = store.select('appState');
  }

  ngOnInit() {
    this.stateSubscription = this.appState$.subscribe(x => {
      this.appState = x;
    });
  }

  handleSimpleAction(data) {
    this.store.dispatch({
      type: 'SIMPLE_ELEMENT_ACTION',
      payload: data
    });
  }

  handleComplexAction(data) {
    this.store.dispatch({
      type: 'COMPLEX_ELEMENT_ACTION',
      payload: data
    });
  }

}
