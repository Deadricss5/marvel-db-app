import { HeroActionTypes } from './actionTypes';

export interface IRequestHeroAction{
  type: HeroActionTypes.ON_REQUEST_HERO;
  id: number
}
export const onRequestHero = (id: number): IRequestHeroAction => {
  return {
    type: HeroActionTypes.ON_REQUEST_HERO,
    id,
  };
};

export type HeroAction = IRequestHeroAction;
