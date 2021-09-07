import React from 'react';
import Paper from '@material-ui/core/Paper';
import Spinner from '../spinner/index';
import MarvelApi from '../../api/api';
import './hero_details.css';
import { IState, IProps, ServerResponse } from './types';

class HeroDetails extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      hero: {
        name: '',
        description: '',
        thumbnail: '',
      },
      comics: [],
    };
  }

  async componentDidMount(): Promise<void> {
    const { id } = this.props;
    await this.getHeroDetails(id);
    await this.getComics(id);
    this.setLoading(false);
  }

  getHeroDetails(id: number): Promise<void> {
    return MarvelApi.getHeroById(id).then(
      (response) => {
        const { name, description, thumbnail } = response.data.data.results[0];
        this.setState({
          hero: {
            name,
            description: description || `We don't have description for ${name}`,
            thumbnail: thumbnail.path,
          },
        });
      },
    );
  }

  getComics(id: number): Promise<void> {
    return MarvelApi.getComics(id).then(
      (response) => {
        const comics = response.data.data.results;
        this.setState({ comics });
      },
    );
  }

  setLoading(value: boolean): void {
    if (value) {
      this.setState({ loading: value });
    }
    setTimeout(() => { this.setState({ loading: value }); }, 500);
  }

  render(): JSX.Element {
    const { loading, hero, comics } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return (
      <div className="hero">
        <div className="hero-details">
          <div>
            <h2 className="hero-details__title">{hero.name}</h2>
            <p className="hero-details__description">{hero.description}</p>
          </div>
          <img className="hero-details__thumbnail" src={`${hero.thumbnail}/detail.jpg`} alt={hero.name} title={hero.name} />
        </div>
        <div className="hero-comics">
          <h2 className="hero-comics__title">Comics:</h2>
          <div className="hero-comics__cards">
            {comics.map((element: ServerResponse) => {
              const src = `${element.thumbnail.path}/portrait_xlarge.${element.thumbnail.extension}`;
              const linkToComic = element.urls[0].url;
              return (
                <a href={linkToComic} target="_blank" rel="noreferrer">
                  <Paper elevation={2} className="hero-comics__card">
                    <img src={src} alt={element.title} title={element.title} />
                    <h5 className="hero-comics__card-title">{element.title}</h5>
                  </Paper>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default HeroDetails;
