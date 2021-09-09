import axios from 'axios';
import md5 from 'md5';
import { IMarvelApi } from '../types/types';

const { REACT_APP_PUBLIC_KEY, REACT_APP_PRIVATE_KEY } = process.env;
const timeStamp: number = Date.now();
const hash: string = md5(timeStamp + <string>REACT_APP_PRIVATE_KEY + REACT_APP_PUBLIC_KEY);
const API_KEY = `ts=${timeStamp}&apikey=${REACT_APP_PUBLIC_KEY}&hash=${hash}`;

class MarvelApi implements IMarvelApi {
  baseURL: string;

  constructor() {
    this.baseURL = 'https://gateway.marvel.com:443/v1/public'
  }

  getHeroes(offset = 0) {
    return axios.get(
      `${this.baseURL}/characters?&${API_KEY}`,
      {
        params: {
          limit: 20,
          offset,
        },
      },
    );
  }

  getHeroById(heroId: number) {
    return axios.get(
      `${this.baseURL}/characters/${heroId}?${API_KEY}`,
    );
  }

  getHeroByName(name?: string | null, offset = 0) {
    return axios.get(
      `${this.baseURL}/characters?&${API_KEY}`,
      {
        params: {
          nameStartsWith: name,
          limit: 20,
          offset,
        },
      },
    );
  }

  getComics(heroId: number) {
    return axios.get(
      `${this.baseURL}/characters/${heroId}/comics?${API_KEY}`,
    );
  }
}

export default new MarvelApi();
