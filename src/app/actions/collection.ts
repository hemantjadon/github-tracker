import { Action } from '@ngrx/store';
import { Repository } from '../models/repository';
import { type } from '../shared/utils';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  ADD_REPOSITORY:               type('[Collection] Add Repository'),
  ADD_REPOSITORY_SUCCESS:       type('[Collection] Add Repository Success'),
  ADD_REPOSITORY_FAIL:          type('[Collection] Add Repository Fail'),
  REMOVE_REPOSITORY:            type('[Collection] Remove Repository'),
  REMOVE_REPOSITORY_SUCCESS:    type('[Collection] Remove Repository Success'),
  REMOVE_REPOSITORY_FAIL:       type('[Collection] Remove Repository Fail'),
  LOAD:              type('[Collection] Load Repository'),
  LOAD_SUCCESS:      type('[Collection] Load Repository Success'),
  LOAD_FAIL:         type('[Collection] Load Repository Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

/**
 * Add Repository to Collection Actions
 */
export class AddRepositoryAction implements Action {
  type = ActionTypes.ADD_REPOSITORY;

  constructor(public payload: Repository) { }
}

export class AddRepositorySuccessAction implements Action {
  type = ActionTypes.ADD_REPOSITORY_SUCCESS;

  constructor(public payload: Repository) { }
}

export class AddRepositoryFailAction implements Action {
  type = ActionTypes.ADD_REPOSITORY_FAIL;

  constructor(public payload: Repository) { }
}


/**
 * Remove Repository from Collection Actions
 */
export class RemoveRepositoryAction implements Action {
  type = ActionTypes.REMOVE_REPOSITORY;

  constructor(public payload: Repository) { }
}

export class RemoveRepositorySuccessAction implements Action {
  type = ActionTypes.REMOVE_REPOSITORY_SUCCESS;

  constructor(public payload: Repository) { }
}

export class RemoveRepositoryFailAction implements Action {
  type = ActionTypes.REMOVE_REPOSITORY_FAIL;

  constructor(public payload: Repository) { }
}

/**
 * Load Collection Actions.
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor() { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Repository[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = AddRepositoryAction
  | AddRepositorySuccessAction
  | AddRepositoryFailAction
  | RemoveRepositoryAction
  | RemoveRepositorySuccessAction
  | RemoveRepositoryFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
