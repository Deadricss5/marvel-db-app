import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import './pagination.css';

interface IProps {
  page: number;
  pages: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Pages = (props: IProps): JSX.Element => {
  const { pages, onChange, page = 1 } = props;
  return (
    <div>
      <Pagination className="pagination" count={pages} onChange={onChange} page={page} />
    </div>
  );
};

export default Pages;
