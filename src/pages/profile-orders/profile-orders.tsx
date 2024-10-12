import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
import { selectOrders } from '../../slices/feedSlice';
import { getOrdersApi } from '@api';
import { log } from 'console';
import { Outlet } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  useEffect(() => {
    let mount = true;
    async function getOrders() {
      try {
        const res = await getOrdersApi();
        if (mount) {
          setOrders(res);
        }
      } catch (error: any) {
        alert(error.message);
      }
    }
    getOrders();
    return () => {
      mount = false;
    };
  }, []);
  return (
    <>
      <ProfileOrdersUI orders={orders} />
      <Outlet />
    </>
  );
};
