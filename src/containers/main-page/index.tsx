import React from 'react';
import Container from '../search_and_cards/container';
import './main-page.css';

interface IState {
  searchInput: string;
}
interface IProps {
  value: boolean;
}

class MainPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  render(): JSX.Element {
    const { searchInput } = this.state;
    return (
      <div className="main-page">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ searchInput: e.target.value });
          }}
          placeholder="Enter hero name"
          className="input"
        />
        <Container name={searchInput} />
      </div>
    );
  }
}

export default MainPage;
