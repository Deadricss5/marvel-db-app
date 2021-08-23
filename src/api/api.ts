import axios from 'axios';
import md5 from 'md5';
import { IMarvelApi } from '../types/types';

function generateApiKey(): string {
  // const keyPublic = '78e53f63a7b15473e3c6ce8e5e3c7f71';
  // const keyPrivate = 'ded020dc438316c8741477116c2c1b19d8035aca';
  // 32926644ce@emailnax.com
  // const keyPublic = '97d07dafe404020c6a6e67d6a9ee45f2';
  // const keyPrivate = 'bd4444d6fedc5ef782c32e663a1fa94accc98975';
  // 56378302b3@emailnax.com
  // const keyPublic = '2fc18fcd157de715be9a7f511b839ae4';
  // const keyPrivate = '60ad714c669921d03f54756411500d750385ce70';
  // 2d1a91bd2a@emailnax.com
  const keyPublic = '0eae8530cd8dcf4e3f02d5aea4380a1f';
  const keyPrivate = '5bd75bc5d706b69eb73833f9f77b8b28e207e3f7';
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
