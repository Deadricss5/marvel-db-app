import React from 'react';
import MarvelApi from './api/api';
import Header from './components/header';
import Container from './containers/container';

MarvelApi.getHeroByName('Dr.').then((res) => { console.log(res); });

function App() {
  return (
    <div>
      <Header />
      <Container />
    </div>
  );
}
export default App;
