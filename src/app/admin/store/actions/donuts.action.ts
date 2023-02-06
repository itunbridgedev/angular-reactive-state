import { Action } from '@ngrx/store';
import { Donut } from '../../models/donut.model';

// load donuts
export const LOAD_DONUTS = '[Admin] Load Donuts';
export const LOAD_DONUTS_FAILURE = '[Admin] Load Donuts Failure';
export const LOAD_DONUTS_SUCCESS = '[Admin] Load Donuts Success';

export class LoadDonuts implements Action {
  readonly type = LOAD_DONUTS;
}

export class LoadDonutsFailure implements Action {
  readonly type = LOAD_DONUTS_FAILURE;
  constructor(public payload: any) {}
}

export class LoadDonutsSuccess implements Action {
  readonly type = LOAD_DONUTS_SUCCESS;
  constructor(public payload: Donut[]) {}
}

// create donut
export const CREATE_DONUT = '[Admin] Create Donut';
export const CREATE_DONUT_FAILURE = '[Admin] Create Donut Failure';
export const CREATE_DONUT_SUCCESS = '[Admin] Create Donut Success';

export class CreateDonut implements Action {
  readonly type = CREATE_DONUT;
  constructor(public payload: Donut) {}
}
export class CreateDonutFailure implements Action {
  readonly type = CREATE_DONUT_FAILURE;
  constructor(public payload: any) {}
}
export class CreateDonutSuccess implements Action {
  readonly type = CREATE_DONUT_SUCCESS;
  constructor(public payload: Donut) {}
}

// update donut
export const UPDATE_DONUT = '[Admin] Update Donut';
export const UPDATE_DONUT_FAILURE = '[Admin] Update Donut Failure';
export const UPDATE_DONUT_SUCCESS = '[Admin] Update Donut Success';

export class UpdateDonut implements Action {
  readonly type = UPDATE_DONUT;
  constructor(public payload: Donut) {}
}
export class UpdateDonutFailure implements Action {
  readonly type = UPDATE_DONUT_FAILURE;
  constructor(public payload: any) {}
}
export class UpdateDonutSuccess implements Action {
  readonly type = UPDATE_DONUT_SUCCESS;
  constructor(public payload: Donut) {}
}

// remove donut
export const REMOVE_DONUT = '[Admin] Remove Donut';
export const REMOVE_DONUT_FAILURE = '[Admin] Remove Donut Failure';
export const REMOVE_DONUT_SUCCESS = '[Admin] Remove Donut Success';

export class RemoveDonut implements Action {
  readonly type = REMOVE_DONUT;
  constructor(public payload: Donut) {}
}
export class RemoveDonutFailure implements Action {
  readonly type = REMOVE_DONUT_FAILURE;
  constructor(public payload: any) {}
}
export class RemoveDonutSuccess implements Action {
  readonly type = REMOVE_DONUT_SUCCESS;
  constructor(public payload: Donut) {}
}

export type DonutActions =
  | LoadDonuts
  | LoadDonutsFailure
  | LoadDonutsSuccess
  | CreateDonut
  | CreateDonutFailure
  | CreateDonutSuccess
  | UpdateDonut
  | UpdateDonutFailure
  | UpdateDonutSuccess
  | RemoveDonut
  | RemoveDonutFailure
  | RemoveDonutSuccess;
