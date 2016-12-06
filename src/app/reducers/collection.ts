import { createSelector } from 'reselect';
import * as collection from '../actions/collection';

export interface State {
  ids: string[],
  loading: boolean,
  loaded: boolean
}

const initialState = {
  ids: [],
  loading: false,
  loaded: false
}

export function reducer(state: State = initialState, action: collection.Actions): State {
  switch (action.type) {
    case collection.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case collection.ActionTypes.LOAD_SUCCESS: {
      const repos = action.payload;

      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        ids: repos.map(repo => repo.id)
      });
    }

    case collection.ActionTypes.ADD_REPOSITORY_SUCCESS:
    case collection.ActionTypes.REMOVE_REPOSITORY_FAIL: {
      const repo = action.payload;

      if (state.ids.indexOf(repo.id.toString()) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, repo.id]
      });
    }

    case collection.ActionTypes.ADD_REPOSITORY_FAIL:
    case collection.ActionTypes.REMOVE_REPOSITORY_SUCCESS: {
      const repo = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== repo.id.toString())
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
