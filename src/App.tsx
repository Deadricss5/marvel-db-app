import React from 'react';
import Header from './components/header';
import MainPage from './containers/main-page';

export default function App(): JSX.Element {
  return (
    <div className="app-container">
      <Header />
      <MainPage value />
    </div>
  );
}
