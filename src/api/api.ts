import axios from 'axios';
import md5 from 'md5';
import { IMarvelApi } from '../types/types';
import { keyPrivate, keyPublic, baseURL } from './.env/variables';

function generateApiKey(): string {
  const timeStamp: number = Date.now();

  const hash: string = md5(timeStamp + keyPrivate + keyPublic);

  return `ts=${timeStamp}&apikey=${keyPublic}&hash=${hash}`;
}
class MarvelApi implements IMarvelApi {
  baseURL: string;

  constructor() {
    this.baseURL = baseURL;
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

  getHeroByName(name?: string | null, offset = 0) {
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
