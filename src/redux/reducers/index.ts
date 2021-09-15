import { IAction } from '../../types/types';

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
    case 'HERO_DETAILS_REQUEST_STARTED':
      return {
        ...state,
        heroLoading: true,
      };
    case 'HERO_DETAILS_REQUEST_SUCCEEDED':
      return {
        ...state,
        heroLoading: false,
      };
    case 'SET_HERO_DETAILS':
      return {
        ...state,
        hero: action.payload.hero,
        comics: action.payload.comics,
      };
    case 'HEROES_REQUEST_STARTED':
      return {
        ...state,
        loading: true,
      };
    case 'HEROES_REQUEST_SUCCEEDED':
      return {
        ...state,
        loading: false,
      };
    case 'SET_HEROES_CARDS':
      return {
        ...state,
        cards: action.payload.cards,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    default:
      return state;
  }
}
