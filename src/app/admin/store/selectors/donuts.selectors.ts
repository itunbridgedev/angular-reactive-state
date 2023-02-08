import { createSelector } from '@ngrx/store';
import { Donut } from '../../models/donut.model';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromDounts from '../reducers/donuts.reducer';

export const getDonutsState = createSelector(
  fromFeature.getAdminState,
  (state: fromFeature.AdminState) => { 
    return state.donuts 
  }
);

export const getDonutsEntities = createSelector(
  getDonutsState,
  fromDounts.getDonutEntities
);

export const getSelectedDonut = createSelector(
    getDonutsEntities,
    fromRoot.getRouterState,
    (entities, router): Donut => {
      return router.state && entities[router.state.params.donutId];
    }
  );

export const getAllDonuts = createSelector(getDonutsEntities, (entities) => {
  return Object.keys(entities).map((id) => entities[id]);
});

export const getDonutsLoaded = createSelector(
  getDonutsState,
  fromDounts.getDonutsLoaded
);

export const getDonutsLoading = createSelector(
  getDonutsState,
  fromDounts.getDonutsLoading
);
