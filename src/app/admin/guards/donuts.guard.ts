import { Injectable } from "@angular/core";
import { CanActivate} from "@angular/router";

import { Store } from "@ngrx/store";
import { of, Observable } from "rxjs";
import { tap, filter, take, switchMap, catchError } from "rxjs/operators";

import * as fromStore from "../store";

@Injectable()
export class DonutsGuard implements CanActivate {
  constructor(private store: Store<fromStore.AdminState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
        switchMap(()=> of(true)),
        catchError(()=> of(false))
    );
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
