export interface IProps {
  id: number;
}

export interface ServerResponse {
  description: string,
  title: string;
  urls: [ { url: string } ];
  thumbnail: { path: string, extension: string};
}

export interface IState {
  loading: boolean;
  comics: [];
  hero: {
    name: string;
    description: string;
    thumbnail: string;
  }
}