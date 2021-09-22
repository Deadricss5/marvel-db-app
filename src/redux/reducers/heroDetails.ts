import { HeroDetailsAction } from '../../types/types';
import { HeroActionTypes } from '../actions/actionTypes';

const InitState = {
  comics: [],
  loading: true,
  hero: {
    id: '',
    description: '',
    name: '',
    title: '',
    urls: [{ url: '' }],
    thumbnail: { path: '', extension: '' },
  },
};

export default function HeroDetails(state = InitState, action: HeroDetailsAction) {
  switch (action.type) {
    case HeroActionTypes.REQUEST_HERO:
      return {
        ...state,
        loading: true,
      };
    case HeroActionTypes.REQUEST_HERO_SUCCESS:
      return {
        ...state,
        hero: action.payload.hero,
        comics: action.payload.comics,
        loading: false,
      };
    case HeroActionTypes.REQUEST_HERO_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
}
