import React from 'react';
import Pagination from '../../components/pagination';
import MediaCard from '../../components/card';
import Spinner from '../../components/spinner';
import './container.css';
import MarvelApi from '../../api/api';
import { serverResponse } from '../../types/types';

interface IProps {
  name: string;
}
interface IState {
  page: number;
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
      page: 1,
      pages: 1,
      cards: [],
      loading: true,
    };
  }

  async componentDidMount(): Promise<void> {
    await this.getHeroes();
    this.setLoading(false);
  }

  // eslint-disable-next-line max-len
  async componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>): Promise<void> {
    const { name } = this.props;
    const { page } = this.state;
    const offset = page * 20 - 20;
    if (prevState.page !== page) {
      if (name !== '') {
        this.setLoading(true);
        await this.getHeroByName(name, offset);
        this.setLoading(false);
      } else {
        this.setLoading(true);
        await this.getHeroes(offset);
        this.setLoading(false);
      }
    }
    if (prevProps !== this.props) {
      if (name === '') {
        this.setPage(1);
        this.setLoading(true);
        await this.getHeroes(offset);
        this.setLoading(false);
      } else {
        this.setPage(1);
        this.setLoading(true);
        await this.getHeroByName(name, offset);
        this.setLoading(false);
      }
    }
  }

  setLoading(value: boolean): void {
    if (value) {
      this.setState({ loading: value });
    }
    setTimeout(() => { this.setState({ loading: value }); }, 700);
  }

  setPage(value: number): void {
    this.setState({ page: value });
  }

  getHeroes(offset = 0): Promise<void> {
    return MarvelApi.getHeroes(offset).then(
      (response) => {
        const cards = response.data.data.results;
        const pages = Math.ceil(response.data.data.total / 20);
        this.setState({ cards, pages });
      },
    );
  }

  getHeroByName(name: string, offset = 0): Promise<void> {
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
      cards, loading, pages, page,
    } = this.state;
    let pagination: JSX.Element | null = (
      <Pagination
        pages={pages}
        page={page}
        onChange={(e: React.ChangeEvent<unknown>, p: number) => { this.setPage(p); }}
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

export default Container;
