import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromDonuts from "./donuts.reducer";

export interface AdminState {
  donuts: fromDonuts.DonutState;
}

export const reducers: ActionReducerMap<AdminState, any> = { // don't understand the genric any
  donuts: fromDonuts.reducer
};

export const getAdminState =
  createFeatureSelector<AdminState>("admin");