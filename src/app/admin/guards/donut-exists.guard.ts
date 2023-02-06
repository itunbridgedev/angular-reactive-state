import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";

import { Store } from "@ngrx/store";

import { Observable } from "rxjs";
import { tap, map, filter, take, switchMap } from "rxjs/operators";
import * as fromStore from '../store';

import { Donut } from '../models/donut.model';

@Injectable()
export class DonutExistsGuards implements CanActivate {
    constructor(private store: Store<fromStore.AdminState>) {}
    canActivate(route: ActivatedRouteSnapshot) {
        return this.checkStore().pipe(
            switchMap(()=> {
                const id = route.params.donutId;
                return this.hasDonut(id)
            })
        )
    }

    hasDonut(id: number): Observable<boolean> {
        return this.store
            .select(fromStore.getDonutsEntities)
            .pipe(
                map((entities: { [key: string]: Donut})=> !!entities[id]),
                take(1)
            )
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getDonutsLoaded).pipe(
          tap((loaded) => {
            if (!loaded) {
              this.store.dispatch(new fromStore.LoadDonuts());
            }
          }),
          filter(loaded => loaded),
          take(1)
        );
      }
}

