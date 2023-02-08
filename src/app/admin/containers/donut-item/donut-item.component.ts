import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store'
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';
import { getSelectedDonut, RemoveDonut, UpdateDonut } from '../../store';
import { map, of, Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'donut-item',
  template: `
    <div>
      <donut-form
        [donut]="(donut$ | async)"
        [isEdit]="isEdit"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      ></donut-form>
    </div>
  `,
  styles: [],
})
export class DonutItemComponent implements OnInit {
  donut$: Observable<Donut> | undefined;
  isEdit!: boolean;
  title: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    // private donutService: DonutService,
    private store: Store<fromStore.AdminState>
  ) {}

  get donut() {
    if(!!this.donut$) return of({ name: "", description: "", icon: "", price: 0});
    return this.donut$
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    // this.donutService
    //   .readById(id)
    //   .subscribe((donut: Donut) => (this.donut = donut));

    // Get donut from store instead of service
    this.donut$ = this.store.select(getSelectedDonut);
    this.isEdit = this.route.snapshot.data['isEdit'];
  }

  onCreate(donut: Donut) {    
    // dispatch create action to store instead of using service directly.
    // this.donutService
    //   .create(donut)
    //   .subscribe({
    //     next: (donut) => this.router.navigate(['admin', 'donuts', donut.id]),
    //     error:(err) => console.log('onCreate error: ', err)
    //   })
    this.store.dispatch(new fromStore.CreateDonut(donut));
  }

  onUpdate(donut: Donut) {
    // this.donutService
    //   .update(donut)
    //   .subscribe({
    //     next: () => this.router.navigate(['admin']),
    //     error:(err) => console.log('onUpdate error: ', err)
    //   });
    // dispatch to store...
    this.store.dispatch(new fromStore.UpdateDonut(donut));
  }

  onDelete(donut: Donut) {
    // this.donutService
    //   .delete(donut)
    //   .subscribe(() => { 
    //     debugger;
    //     this.router.navigate(['admin']);
    //   });
    this.store.dispatch(new RemoveDonut(donut));
  }
}
