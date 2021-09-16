import { IAction } from '../../types/types';
import { HeroActionTypes, HeroesActionTypes } from '../actions/actionTypes';

const InitState = {
  comics: [],
  cards: [],
  loading: true,
  heroLoading: true,
  page: 1,
  hero: {
    id: '',
    description: '',
    name: '',
    title: '',
    urls: [{ url: '' }],
    thumbnail: { path: '', extension: '' },
  },
};

export default function reducer(state = InitState, action: IAction) {
  switch (action.type) {
    case HeroActionTypes.ON_REQUEST_HERO_START:
      return {
        ...state,
        heroLoading: true,
      };
    case HeroActionTypes.ON_REQUEST_HERO_SUCCESS:
      return {
        ...state,
        hero: action.payload.hero,
        comics: action.payload.comics,
        heroLoading: false,
      };
    case HeroesActionTypes.ON_REQUEST_HEROES_START:
      return {
        ...state,
        loading: true,
      };
    case HeroesActionTypes.ON_REQUEST_HEROES_SUCCESS:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        cards: action.payload.response.results,
        totalPages: Math.ceil(action.payload.response.total / 20),
        loading: false,
      };
    default:
      return state;
  }
}
