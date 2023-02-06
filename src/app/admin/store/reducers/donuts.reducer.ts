import { Donut } from '../../models/donut.model';
import * as fromDonuts from '../actions/donuts.action';

import { arrayToEntities } from '../../../helpers/array.helpers';

export interface DonutState {
  entities: { [id: number]: Donut }; // { 1: { id: 1, name: "my donut", icon: "my.svg", price: 100, promo: 'new', description: 'example donut' } };
  loaded: boolean;
  loading: boolean;
}

export const initialState: DonutState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state: DonutState = initialState,
  action: fromDonuts.DonutActions
): DonutState {
  switch (action.type) {
    case fromDonuts.LOAD_DONUTS: {
      // simply update the fact that we are attempting to load the donuts
      return {
        ...state, // spread the existing state (entities and loaded)
        loading: true,
      };
    }
    case fromDonuts.LOAD_DONUTS_SUCCESS: {
      // triggered by an *Effect* (presumably from a service call to the database)
      const donuts = action.payload;
      // instead of storing the flat array in the State, we index it by ID
      const entities = arrayToEntities(donuts, 'id');
      // create a new object that spreads the existing DonutState
      return {
        ...state, // not needed in this case because we're changing all 3 properties.
        loading: false,
        loaded: true,
        entities,
      };
    }
    case fromDonuts.LOAD_DONUTS_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }
  }
  return state;
}

export const getDonutEntities = (state: DonutState) => state.entities;
export const getDonutsLoading = (state: DonutState) => state.loading;
export const getDonutsLoaded = (state: DonutState) => state.loaded;
