import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';
import { Store } from "@ngrx/store";
import * as fromStore from '../../store';

@Component({
  selector: 'donut-list',
  template: `
    <div>
      <div class="donut-list-actions">
        <a routerLink="new" class="btn btn--green">
          New donut
          <img src="/assets/img/icon/plus.svg" />
        </a>
    </div>
      <ng-container *ngIf="(donuts$ | async)?.length; else nothing">
        <donut-card
          *ngFor="let donut of (donuts$ | async)"
          [donut]="donut"
        >
        </donut-card>
      </ng-container>
      <ng-template #nothing>
        <p>No Donuts here...</p>
        <p></p>
      </ng-template>
    </div>
  `,
  styles: [`.donut-list {
    &-actions { margin-bottom: 10px; }
  }`],
})
export class DonutListComponent implements OnInit {
  donuts$!: Observable<Donut[]>;

  // abstract concept of "fromStore" is the combined elements that make up state
  // (actions, reducers, selectors, effects - all exported from root index)
  constructor(private store: Store<fromStore.AdminState>) {}

  ngOnInit(): void {
    // First major change is that components don't talk with services directly.
    // this.donutService
    //   .read()
    //   .subscribe((donuts: Donut[]) => {
    //     (this.donuts = donuts)
    //   });

    // Instead, all data is now provided by the store.
    // (updated the constructor to injext the AdminStore instead of DonutService)
    // Another big change is that we're not working with arrays,
    // rather we read straight from the Observable stream (donuts becomes donuts$)
    // Angular has a built in async directive to render this directly in the template

                      // convenient selector --v
    this.donuts$ = this.store.select(fromStore.getAllDonuts);
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}

