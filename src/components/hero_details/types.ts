import { SET_HERO_DETAILS_ACTION } from '../../types/types';

type DispatchType = (args: SET_HERO_DETAILS_ACTION) => SET_HERO_DETAILS_ACTION
export interface IProps {
  dispatch: DispatchType;
  heroLoading: boolean;
  hero: {
    id: number;
    description: string,
    name: string,
    title: string;
    urls: [ { url: string } ];
    thumbnail: { path: string, extension: string};
  }
  loading: boolean,
  comics: [],
  match: {
    params: {
      id: number;
    }
  }
}

export interface ServerResponse {
  id: number;
  description: string,
  title: string;
  urls: [ { url: string } ];
  thumbnail: { path: string, extension: string};
}

export interface IState {
  loading: boolean;
}

export interface IheroDetailsData {
  name: string;
  description: string;
  thumbnail: string;
}
