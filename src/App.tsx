import React, { useState } from 'react';
import Header from './components/header';
import Container from './containers/container';
// import Spinner from './components/spinner';

function App() {
  const [searchInput, setSearchInput] = useState('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setSearchInput(e.target.value);
  };
  return (
    <div className="app-container">
      <Header />
      <input
        value={searchInput}
        onChange={onChangeSearch}
        placeholder="Enter hero name"
        className="input"
      />
      <Container name={searchInput} />
    </div>
  );
}
export default App;
