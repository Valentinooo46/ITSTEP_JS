import { AppDispatcher } from './dispatcher';

export const EventActionTypes = {
  SET_CATEGORY_FILTER: 'SET_CATEGORY_FILTER',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE'
};

export const EventActions = {
  setCategoryFilter(category) {
    AppDispatcher.dispatch({
      type: EventActionTypes.SET_CATEGORY_FILTER,
      payload: category
    });
  },

  addFavorite(id) {
    AppDispatcher.dispatch({
      type: EventActionTypes.ADD_FAVORITE,
      payload: id
    });
  },

  removeFavorite(id) {
    AppDispatcher.dispatch({
      type: EventActionTypes.REMOVE_FAVORITE,
      payload: id
    });
  }
};