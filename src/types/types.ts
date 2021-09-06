import { AxiosResponse } from 'axios';

export interface serverResponse {
    description: string,
    id: string;
    name: string,
    thumbnail: { path: string, extension: string};
}
export interface heroes {
    description: string,
    id: string;
    name: string,
    thumbnail: string;
}
export interface IMarvelApi {
    baseURL: string;
    getHeroes(limit: number, offset: number): Promise<AxiosResponse<void>>;
    getHeroById(heroId: number): Promise<AxiosResponse<void>>;
    getHeroByName(name: string, offset: number): Promise<AxiosResponse<void>>;
    getComics(heroId: number, limit: number, offset: number): Promise<AxiosResponse<void>>;
}
