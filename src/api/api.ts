import axios from 'axios';
import md5 from 'md5';
import { IMarvelApi } from '../types/types';
import { keyPrivate, keyPublic } from './.env/variables';

function generateApiKey(): string {
  const ts: number = Date.now();

  const hash: string = md5(ts + keyPrivate + keyPublic);

  return `ts=${ts}&apikey=${keyPublic}&hash=${hash}`;
}
class MarvelApi implements IMarvelApi {
  baseURL: string;

  constructor() {
    this.baseURL = 'https://gateway.marvel.com:443/v1/public';
  }

  getHeroes(offset = 0) {
    return axios.get(
      `${this.baseURL}/characters?&${generateApiKey()}`,
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
      `${this.baseURL}/characters/${heroId}?${generateApiKey()}`,
    );
  }

  getHeroByName(name: string, offset = 0) {
    return axios.get(
      `${this.baseURL}/characters?&${generateApiKey()}`,
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
      `${this.baseURL}/characters/${heroId}/comics?${generateApiKey()}`,
    );
  }
}

export default new MarvelApi();
