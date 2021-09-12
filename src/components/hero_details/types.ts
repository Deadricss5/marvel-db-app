export interface IProps {
  match: {
    params: {
      id: number;
    }
  }
}

export interface ServerResponse {
  id: number;
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
  };
}