import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../search_and_cards/container';
import './main-page.css';

export default function MainPage({ location, history }: RouteComponentProps): JSX.Element {
  const params = new URLSearchParams(location.search);
  const heroName: string = params.get('name') || '';
  return (
    <div className="main-page">
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value) {
            history.push({
              search: `?name=${e.target.value}`,
            });
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
