import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Pagination from '../../components/pagination';
import MediaCard from '../../components/card';
import Spinner from '../../components/spinner';
import './container.css';
import MarvelApi from '../../api/api';
import { serverResponse } from '../../types/types';

type IProps = RouteComponentProps & {
  name: string | null;
  page: number;
}
interface IState {
  pages: number;
  cards: [];
  loading: boolean;
}

class Container extends React.Component<IProps, IState> {
  elms: [];

  constructor(props: IProps) {
    super(props);
    this.elms = [];
    this.state = {
      pages: 1,
      cards: [],
      loading: true,
    };
  }

  async componentDidMount(): Promise<void> {
    const { page, name } = this.props;
    let offset = page * 20 - 20;
    const heroName = name || null;
    await this.getHeroByName(offset, heroName);
    this.setLoading(false);
    const { pages } = this.state;
    if (page > pages) {
      offset = pages * 20 - 20;
      await this.getHeroByName(offset, heroName);
    }
  }

  // eslint-disable-next-line max-len
  async componentDidUpdate(prevProps: Readonly<IProps>): Promise<void> {
    const { name, page } = this.props;
    const offset = page * 20 - 20;
    const heroName = name || null;
    if (prevProps.page !== page) {
      this.setLoading(true);
      await this.getHeroByName(offset, heroName);
      this.setLoading(false);
    }
    if (prevProps !== this.props) {
      this.setLoading(true);
      await this.getHeroByName(offset, heroName);
      this.setLoading(false);
    }
  }

  setLoading(value: boolean): void {
    if (value) {
      this.setState({ loading: value });
    }
    setTimeout(() => { this.setState({ loading: value }); }, 700);
  }

  getHeroByName(offset = 0, name?: string | null): Promise<void> {
    return MarvelApi.getHeroByName(name, offset).then(
      (response) => {
        const cards = response.data.data.results;
        const pages = Math.ceil(response.data.data.total / 20);
        this.setState({ cards, pages });
      },
    );
  }

  render(): JSX.Element {
    const {
      cards, loading, pages,
    } = this.state;
    const { page, history, name } = this.props;
    let pagination: JSX.Element | null = (
      <Pagination
        pages={pages}
        page={page}
        onChange={(e: React.ChangeEvent<unknown>, p: number) => {
          history.push({
            pathname: '/',
            search: name ? `?name=${name}&page=${p}` : `?page=${p}`,
          });
        }}
      />
    );
    if (loading) {
      return <Spinner />;
    }
    if (pages <= 1) {
      pagination = null;
    }
    return (
      <div className="container">
        <div className="cards-container">
          {cards.map((item: serverResponse) => {
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

export default withRouter(Container);
