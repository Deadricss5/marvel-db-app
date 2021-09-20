import { HeroDetailsAction } from '../../types/types';
import { HeroActionTypes } from '../actions/actionTypes';

const InitState = {
  comics: [],
  heroLoading: true,
  hero: {
    id: '',
    description: '',
    name: '',
    title: '',
    urls: [{ url: '' }],
    thumbnail: { path: '', extension: '' },
  },
};

export default function HeroDetailsReducer(state = InitState, action: HeroDetailsAction) {
  switch (action.type) {
    case HeroActionTypes.REQUEST_HERO:
      return {
        ...state,
        heroLoading: true,
      };
    case HeroActionTypes.REQUEST_HERO_SUCCESS:
      return {
        ...state,
        hero: action.payload.hero,
        comics: action.payload.comics,
        heroLoading: false,
      };
    case HeroActionTypes.REQUEST_HERO_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
