import { put, takeEvery } from 'redux-saga/effects';
import MarvelApi from '../../api/api';
import { SET_HEROES_ACTION, SET_HERO_DETAILS_ACTION } from '../../types/types';

const wait = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout((resolve), time);
  });
};

async function getHeroes(offset = 0, name?: string | null): Promise<void> {
  const request = await MarvelApi.getHeroByName(name, offset);
  return request.data.data;
}

async function getComics(id: number): Promise<void> {
  const request = await MarvelApi.getComics(id);
  return request.data.data.results;
}

async function getHeroDetails(id: number): Promise<void> {
  const request = await MarvelApi.getHeroById(id);
  return request.data.data.results[0];
}

export function* getHeroDetailsSaga({ id }: SET_HERO_DETAILS_ACTION): Generator {
  yield put({ type: 'HERO_DETAILS_REQUEST_STARTED' });
  const hero = yield getHeroDetails(id);
  const comics = yield getComics(id);
  yield put({ type: 'SET_HERO_DETAILS', payload: { hero, comics } });
  yield wait(500);
  yield put({ type: 'HERO_DETAILS_REQUEST_SUCCEEDED' });
}

// eslint-disable-next-line max-len
export function* getHeroesCardsSaga({ name = null, offset = 1, page }: SET_HEROES_ACTION): Generator {
  yield put({ type: 'HEROES_REQUEST_STARTED' });
  const response = yield getHeroes(offset, name);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const pages = Math.ceil(response.total / 20);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const cards = response.results;
  yield put({ type: 'SET_HEROES_CARDS', payload: { cards, pages, page } });
  yield wait(500);
  yield put({ type: 'HEROES_REQUEST_SUCCEEDED' });
}
export function* watchSaga(): Generator {
  yield takeEvery('HEROES_REQUEST', getHeroesCardsSaga);
  yield takeEvery('HERO_DETAILS_REQUEST', getHeroDetailsSaga);
}

export default function* rootSaga(): Generator {
  yield watchSaga();
}
