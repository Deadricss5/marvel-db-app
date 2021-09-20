import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Pagination from '../../components/pagination';
import MediaCard from '../../components/card';
import Spinner from '../../components/spinner';
import './container.css';
import { serverResponse, IState, DispatchType } from '../../types/types';
import { onRequestHeroes } from '../../redux/actions/heroesActions';

interface IProps extends RouteComponentProps {
  dispatch?: DispatchType;
  Heroes?: {
    loading: boolean;
    cards: [];
    totalPages: number;
    currentPage: number;
  }
}

class Container extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount(): void {
    this.loadData('DidMount');
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    this.loadData('DidUpdate', prevProps);
  }

  loadData = (lifeCycleMethodType: string, prevProps?: Readonly<IProps>): void => {
    const { location, dispatch } = this.props;
    const params = new URLSearchParams(location.search);
    const currentPage: number = Number(params.get('page')) || 1;
    const heroName = params.get('name') || null;
    const offset = currentPage * 20 - 20;
    if (lifeCycleMethodType === 'DidMount' && dispatch) {
      dispatch(onRequestHeroes(heroName, offset, currentPage));
    }
    if (lifeCycleMethodType === 'DidUpdate' && prevProps !== undefined && location.search !== prevProps.location.search && dispatch) {
      dispatch(onRequestHeroes(heroName, offset, currentPage));
    }
  };

  render(): JSX.Element {
    const {
      history,
      location,
      Heroes,
    } = this.props;
    let cards;
    let loading;
    let totalPages;
    if (Heroes !== undefined) {
      cards = Heroes.cards;
      loading = Heroes.loading;
      totalPages = Heroes.totalPages;
    }
    const params = new URLSearchParams(location.search);
    const page: number = Number(params.get('page')) || 1;
    const heroName = params.get('name');
    let pagination: JSX.Element | null = null;
    if (typeof totalPages === 'number') {
      pagination = (
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
    }
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
  }
}
const mapStateToProps = (state: IState) => {
  return state;
};

export default connect(mapStateToProps)(withRouter(Container));
