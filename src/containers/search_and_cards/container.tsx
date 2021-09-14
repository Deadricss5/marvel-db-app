import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Pagination from '../../components/pagination';
import MediaCard from '../../components/card';
import Spinner from '../../components/spinner';
import './container.css';
import { serverResponse, IState, DispatchType } from '../../types/types';

interface IProps extends RouteComponentProps {
  dispatch?: DispatchType;
  loading?: boolean;
  cards?: [];
  pages?: number;
  page?: number;
}

class Container extends React.Component<IProps> {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount(): void {
    const { location, dispatch } = this.props;
    const params = new URLSearchParams(location.search);
    const page: number = Number(params.get('page')) || 1;
    const heroName = params.get('name') || null;
    const offset = page * 20 - 20;
    if (dispatch) {
      dispatch({
        type: 'HEROES_REQUEST',
        name: heroName,
        offset,
        page,
      });
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    const { location, dispatch } = this.props;
    const params = new URLSearchParams(location.search);
    const page: number = Number(params.get('page')) || 1;
    const heroName = params.get('name') || null;
    const offset = page * 20 - 20;
    if (location.search !== prevProps.location.search) {
      if (dispatch) {
        dispatch({
          type: 'HEROES_REQUEST',
          name: heroName,
          offset,
          page,
        });
      }
    }
  }

  render(): JSX.Element {
    const {
      history,
      location,
      cards,
      loading,
      pages,
    } = this.props;
    const params = new URLSearchParams(location.search);
    const page: number = Number(params.get('page')) || 1;
    const heroName = params.get('name');
    let pagination: JSX.Element | null = null;
    if (typeof pages === 'number') {
      pagination = (
        <Pagination
          pages={pages}
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
    if (pages === 1) {
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
