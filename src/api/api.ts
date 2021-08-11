import axios from 'axios';
import md5 from 'md5';

function generateApiKey(): string {
  const keyPublic: string = '78e53f63a7b15473e3c6ce8e5e3c7f71';
  const keyPrivate: string = 'ded020dc438316c8741477116c2c1b19d8035aca';
  const ts: number = Date.now();

  const hash: string = md5(ts + keyPrivate + keyPublic);

  return `ts=${ts}&apikey=${keyPublic}&hash=${hash}`;
}

class MarvelApi {
  baseURL: string;

  constructor() {
    const baseURL: string = 'https://gateway.marvel.com:443/v1/public';
    this.baseURL = baseURL;
  }

  getHeroes(limit: number) {
    return axios.get(
      `${this.baseURL}/characters?limit=${limit}&${generateApiKey()}`,
    );
  }

  getHeroById(heroId: number) {
    return axios.get(
      `${this.baseURL}/characters/${heroId}?${generateApiKey()}`,
    );
  }

  getHeroByName(name: string) {
    return axios.get(
      `${this.baseURL}/characters?nameStartsWith=${name}&${generateApiKey()}`,
    );
  }

  getComics(heroId: number) {
    return axios.get(
      `${this.baseURL}/characters/${heroId}/comics?${generateApiKey()}`,
    );
  }
}

export default new MarvelApi();
