import { createSelector } from 'reselect';
import { Repository } from '../models/repository';
import * as repository from '../actions/repository';
import * as collection from '../actions/collection';


export interface State {
  ids: string[];
  entities: { [id: string]: Repository };
  selectedRepoId: string | null
};

const initialState: State = {
  ids: [],
  entities: {},
  selectedRepoId: null
}

export function reducer(state: State = initialState, action: repository.Actions | collection.Actions ): State {
  switch (action.type){
    case repository.ActionTypes.SEARCH_COMPLETE:
    case collection.ActionTypes.LOAD_SUCCESS: {
      const repos = action.payload;
      const newRepos = repos.filter(repo => !state.entities[repo.id]);

      const newRepoIds = newRepos.map(repo => repo.id);
      const newRepoEntities = newRepos.reduce((entities: { [id: string]: Repository}, repo: Repository) => {
        return Object.assign(entities, {
          [repo.id] : repo
        });
      },{});

      return Object.assign({}, state, {
        ids: [ ...state.ids, ...newRepoIds],
        enteties: Object.assign({}, state.entities, newRepoEntities),
      });
    }

    case repository.ActionTypes.LOAD: {
      const repo = action.payload;

      if (state.ids.indexOf(repo.id.toString()) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, repo.id],
        enteties: Object.assign({}, state.entities, {
          [repo.id]: repo
        }),
      });
    }

    case repository.ActionTypes.SELECT: {
      return Object.assign({}, state, {
        selectdRepoId: action.payload
      });
    }

    default: {
      return state;
    }
  }
}



/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.entities;

export const getSelectedId = (state: State) => state.selectedRepoId;

export const getIds = (state: State) => state.ids;

export const getSelected = (state: State) => createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return getEntities[selectedId];
});

export const getAll = (state: State) => createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
