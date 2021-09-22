import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Pagination from '../../components/pagination';
import MediaCard from '../../components/card';
import Spinner from '../../components/spinner';
import './container.css';
import { serverResponse, IState } from '../../types/types';
import { onRequestHeroes } from '../../redux/actions/heroesActions';

const Container = (props: RouteComponentProps): JSX.Element => {
  const {
    history,
    location,
  } = props;
  const { loading, cards, totalPages } = useSelector((store: IState) => {
    return store.heroes;
  });
  const params = new URLSearchParams(location.search);
  const currentPage: number = Number(params.get('page')) || 1;
  const page: number = Number(params.get('page')) || 1;
  const heroName: string | null = params.get('name') || null;
  const offset: number = currentPage * 20 - 20;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onRequestHeroes(heroName, offset, currentPage));
  }, [heroName, page]);
  let pagination: JSX.Element | null = (
    <Pagination
      pages={totalPages}
      page={page}
      onChange={(e: React.ChangeEvent<unknown>, p: number) => {
        history.push({
          pathname: '/',
          search: heroName ? `?name=${heroName}&page=${p}` : `?page=${p}`,
        });
      }}
    />
  );
  if (totalPages === 1) {
    pagination = null;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="container">
      <div className="cards-container">
        {cards?.map((item: serverResponse) => {
          const animationTimeout = (Math.round(Math.random() * (7 - 3) + 1) * 200);
          return (
            <MediaCard
              id={item.id}
              name={item.name}
              thumbnail={item.thumbnail.path}
              key={item.id}
              timeout={animationTimeout}
            />
          );
        })}
      </div>
      {pagination}
    </div>
  );
};

export default withRouter(Container);
