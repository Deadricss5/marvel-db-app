import React, { useState, useEffect } from 'react';
import MediaCard from '../components/card';
import './container.css';
import MarvelApi from '../api/api';
import { serverRes } from '../types/types';

interface IProps {
  name: string;
}

const Container = (props: IProps) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (props.name) {
        const request = await MarvelApi.getHeroByName(props.name);
        setCards(request.data.data.results);
        return request;
      }
      const request = await MarvelApi.getHeroes(20);
      setCards(request.data.data.results);
      return request;
    }
    fetchData();
  }, [props]);
  const elms = cards.map((item: serverRes) => {
    // eslint-disable-next-line max-len
    return <MediaCard id={item.id} name={item.name} thumbnail={item.thumbnail.path} key={item.id} />;
  });
  return (
    <div className="container">
      {elms}
    </div>
  );
};

export default Container;
