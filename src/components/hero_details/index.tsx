import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Spinner from '../spinner/index';
import './hero_details.css';
import { IState, IProps, ServerResponse } from './types';

class HeroDetails extends React.Component<IProps, IState> {
  componentDidMount(): void {
    const { match } = this.props;
    const { id } = match.params;
    const { dispatch } = this.props;
    dispatch({ type: 'HERO_DETAILS_REQUEST', id });
  }

  render(): JSX.Element {
    const { hero, comics, heroLoading } = this.props;
    if (heroLoading) {
      return (<Spinner />);
    }
    return (
      <div className="hero">
        <div className="hero-details">
          <div>
            <h2 className="hero-details__title">{hero.name}</h2>
            <p className="hero-details__description">{hero.description || `We don't have description for ${hero.name}`}</p>
          </div>
          <img className="hero-details__thumbnail" src={`${hero.thumbnail.path}/detail.jpg`} alt={hero.name} title={hero.name} />
        </div>
        <div className="hero-comics">
          <h2 className="hero-comics__title">Comics:</h2>
          <div className="hero-comics__cards">
            {comics.map((el: ServerResponse) => {
              const src = `${el.thumbnail.path}/portrait_xlarge.${el.thumbnail.extension}`;
              return (
                <a href={el.urls[0].url} target="_blank" rel="noreferrer" key={el.id}>
                  <Paper elevation={2} className="hero-comics__card">
                    <img src={src} alt={el.title} title={el.title} />
                    <h5 className="hero-comics__card-title">{el.title}</h5>
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

const mapStateToProps = (state: IState) => {
  return state;
};

export default connect(mapStateToProps)(HeroDetails);
