import React, { useState, useEffect } from 'react';
import MediaCard from '../components/card';
import Spinner from '../components/spinner';
import './container.css';
import MarvelApi from '../api/api';
import { serverRes } from '../types/types';

interface IProps {
  name: string;
}

const Container = (props: IProps) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
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
    fetchData().then(() => {
      setTimeout(() => { setLoading(false); }, 500);
    });
  }, [props]);
  const elms = cards.map((item: serverRes, index) => {
    const timeout = (500 + index * 100);
    // eslint-disable-next-line max-len
    return <MediaCard id={item.id} name={item.name} thumbnail={item.thumbnail.path} key={item.id} timeout={timeout} />;
  });
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="container">
      {elms}
    </div>
  );
};

export default Container;
