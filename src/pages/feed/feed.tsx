import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { getFeedsApiThunk, selectOrders } from '../../slices/feedSlice';
import { Outlet } from 'react-router-dom';
import { getFeedsApi } from '@api';

export const Feed: FC = () => {
  /** TOD: взять переменную из стора */
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch<AppDispatch>();
  if (!orders.length) {
    return <Preloader />;
  }
  const handleGetFeeds = () => {
    dispatch(getFeedsApiThunk());
  };

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
      <Outlet />
    </>
  );
};
