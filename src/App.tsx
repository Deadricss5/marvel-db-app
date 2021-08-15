import React from 'react';
import MarvelApi from './api/api';

import Header from './components/header';

MarvelApi.getHeroByName('Dr.').then((res) => { console.log(res); });

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}
export default App;
