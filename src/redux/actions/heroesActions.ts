import { HeroesActionTypes } from './actionTypes';

export interface IRequestHeroesAction{
  type: HeroesActionTypes.REQUEST_HEROES;
  name: string | null,
  offset: number,
  currentPage: number,
}
export const onRequestHeroes = (heroName: string | null, offset: number, currentPage: number): IRequestHeroesAction => {
  return {
    type: HeroesActionTypes.REQUEST_HEROES,
    name: heroName,
    offset,
    currentPage,
  };
};

export type HeroesAction = IRequestHeroesAction;
