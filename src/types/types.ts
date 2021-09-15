import { AxiosResponse } from 'axios';

export interface serverResponse {
    description: string,
    id: string;
    name: string,
    thumbnail: { path: string, extension: string};
}
export interface IMarvelApi {
    baseURL: string;
    getHeroes(limit: number, offset: number): Promise<AxiosResponse<void>>;
    getHeroById(heroId: number): Promise<AxiosResponse<void>>;
    getHeroByName(name: string, offset: number): Promise<AxiosResponse<void>>;
    getComics(heroId: number, limit: number, offset: number): Promise<AxiosResponse<void>>;
}
export interface IAction {
    type: string,
    payload: {
        comics: [],
        cards: [],
        totalPages: number,
        currentPage: number,
        hero: {
            id: string,
            description: string,
            name: string,
            title: string,
            urls: [{ url: string }],
            thumbnail: { path: string, extension: string },
        },
    };
}
export interface IState {
    comics: []
    cards: []
    loading: boolean
    heroLoading: boolean
    page: number
    hero: {
        id: string,
        description: string,
        name: string,
        title: string,
        urls: [{ url: string }],
        thumbnail: { path: '', extension: string },
    },
    pages: number
}
export interface SET_HERO_DETAILS_ACTION {
    type:string
    id: number
}
export type SET_HEROES_ACTION = {
    type: string
    name: string | null
    offset?: number
    currentPage?: number
}
export type HeroDetailsAction = {
    type: string
    id: number
}
export type DispatchType = (args: SET_HEROES_ACTION) => SET_HEROES_ACTION
