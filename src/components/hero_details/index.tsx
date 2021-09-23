import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Spinner from '../spinner/index';
import './hero_details.css';
import { IState, IProps, ServerResponse } from './types';
import { onRequestHero } from '../../redux/actions/heroActions';

const HeroDetails = (props: IProps): JSX.Element => {
  const { match } = props;
  const heroId = match.params.id;
  const { comics, hero, loading } = useSelector((store: IState) => {
    return store.heroDetails;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onRequestHero(heroId));
  }, [heroId]);

  if (loading) {
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
            const { url } = el.urls[0];
            const { title, id } = el;
            return (
              <a href={url} target="_blank" rel="noreferrer" key={id}>
                <Paper elevation={2} className="hero-comics__card">
                  <img src={src} alt={title} title={title} />
                  <h5 className="hero-comics__card-title">{title}</h5>
                </Paper>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroDetails;
