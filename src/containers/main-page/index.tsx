import React from 'react';
import Container from '../search_and_cards/container';
import './main-page.css';

interface IState {
  searchInput: string;
}
interface IProps {
  value: string;
  location: {
    search: string,
  };
  history: {
    length: number,
    location: {
      pathname: string;
      search: string;
    }
    push(path: string): void;
    replace(path: string): void;
  };
}

class MainPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  componentDidMount(): void {
    const { location } = this.props;
    const params = new URLSearchParams(location.search);
    if (params.has('name')) {
      this.setState({ searchInput: params.get('name') || '' });
    }
  }

  render(): JSX.Element {
    const { searchInput } = this.state;
    const { history, location } = this.props;
    const params = new URLSearchParams(location.search);
    const page: number = Number(params.get('page')) || 1;
    const heroName: string = params.get('name') || '';
    return (
      <div className="main-page">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ searchInput: e.target.value });
            if (e.target.value) {
              history.push(`/?name=${e.target.value}`);
            } else {
              history.push('/');
            }
          }}
          placeholder="Enter hero name"
          className="input"
          value={searchInput}
        />
        <Container name={searchInput || heroName} page={page} />
      </div>
    );
  }
}

export default MainPage;
