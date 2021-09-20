import { HeroesAction } from '../../types/types';
import { HeroesActionTypes } from '../actions/actionTypes';

const InitState = {
  cards: [],
  loading: true,
  page: 1,
};

export default function Heroes(state = InitState, action: HeroesAction) {
  switch (action.type) {
    case HeroesActionTypes.REQUEST_HEROES:
      return {
        loading: true,
      };
    case HeroesActionTypes.REQUEST_HEROES_SUCCESS:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        cards: action.payload.response.results,
        totalPages: Math.ceil(action.payload.response.total / 20),
        loading: false,
      };
    case HeroesActionTypes.REQUEST_HEROES_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
