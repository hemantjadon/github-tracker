import { createSelector } from 'reselect';
import  * as repository from '../actions/repository';

export interface State {
  ids : string[],
  loading : boolean,
  query : string
}

const initialState = {
  ids : [],
  loading : false,
  query : ''
}

export function reducer(state: State = initialState, action: repository.Actions): State {
  switch (action.type) {
    case repository.ActionTypes.SEARCH: {
      const query = action.payload;

      if (query === '') {
        return state;
      }

      return Object.assign({}, state, {
        query,
        loading: true
      });
    }

    case repository.ActionTypes.SEARCH_COMPLETE: {
      const repositories = action.payload;

      return Object.assign({}, state, {
        ids: repositories.map(repo => repo.id),
        loading: false
      });
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getLoading = (state: State) => state.loading;

export const getQuery = (state: State) => state.query;
