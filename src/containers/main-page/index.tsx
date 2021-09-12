import React from 'react';
import Container from '../search_and_cards/container';
import './main-page.css';

interface IProps {
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

export default function MainPage({ location, history }: IProps): JSX.Element {
  const params = new URLSearchParams(location.search);
  const heroName: string = params.get('name') || '';
  return (
    <div className="main-page">
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value) {
            history.push(`/?name=${e.target.value}`);
          } else {
            history.push('/');
          }
        }}
        placeholder="Enter hero name"
        className="input"
        value={heroName}
      />
      <Container />
    </div>
  );
}
