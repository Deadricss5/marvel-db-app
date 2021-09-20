import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import MarvelApi from '../../api/api';
import { SET_HEROES_ACTION, SET_HERO_DETAILS_ACTION } from '../../types/types';
import { HeroActionTypes, HeroesActionTypes } from '../actions/actionTypes';

async function getHeroes(offset = 0, name?: string | null): Promise<void> {
  let request;
  try {
    request = await MarvelApi.getHeroByName(name, offset);
    return request.data.data;
  } catch (error) {
    return error;
  }
}

async function getComics(id: number): Promise<void> {
  try {
    const request = await MarvelApi.getComics(id);
    return request.data.data.results;
  } catch (error) {
    return error;
  }
}

async function getHeroDetails(id: number): Promise<void> {
  const request = await MarvelApi.getHeroById(id);
  return request.data.data.results[0];
}

export function* getHeroDetailsSaga({ id }: SET_HERO_DETAILS_ACTION): Generator {
  try {
    yield put({ type: HeroActionTypes.REQUEST_HERO_START });
    const hero = yield getHeroDetails(id);
    const comics = yield getComics(id);
    yield put({ type: HeroActionTypes.REQUEST_HERO_SUCCESS, payload: { hero, comics } });
  } catch (error) {
    yield put({ type: HeroActionTypes.REQUEST_HERO_ERROR, payload: { error } });
  }
}

export function* getHeroesCardsSaga({ name = null, offset = 1, currentPage }: SET_HEROES_ACTION): Generator {
  try {
    yield put({ type: HeroesActionTypes.REQUEST_HEROES_START });
    const response = yield getHeroes(offset, name);
    yield put({ type: HeroesActionTypes.REQUEST_HEROES_SUCCESS, payload: { response, currentPage } });
  } catch (error) {
    yield put({ type: HeroesActionTypes.REQUEST_HEROES_ERROR, payload: { error } });
  }
}
export function* watchSaga(): Generator {
  yield takeLatest('REQUEST_HEROES', getHeroesCardsSaga);
  yield takeEvery('REQUEST_HERO', getHeroDetailsSaga);
}

export default function* rootSaga(): Generator {
  yield watchSaga();
}
