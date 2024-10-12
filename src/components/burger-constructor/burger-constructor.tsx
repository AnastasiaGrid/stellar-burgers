import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { AppDispatch, RootState } from 'src/services/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteConstructorItems,
  selectConstructorItem
} from '../../slices/burgerConstuctorSlice';
import { getCookie } from 'src/utils/cookie';
import { orderBurgerApi } from '@api';
import {
  deleteOrderModal,
  orderBurgerApiThunk,
  selectOrderModalData,
  selectOrderRequest
} from '../../slices/orderSlice';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItem);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const ingredientForOrder = constructorItems.ingredients.map(
      (item) => item._id
    );
    if (isAuthenticated) {
      dispatch(
        orderBurgerApiThunk([
          ...ingredientForOrder,
          constructorItems.bun._id,
          constructorItems.bun._id
        ])
      );
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    if (!orderRequest) {
      dispatch(deleteOrderModal());
      dispatch(deleteConstructorItems());
      navigate('/');
    }
  };

  const price = useMemo(() => {
    const res = constructorItems.ingredients.reduce(
      (s: number, v: TIngredient) => s + v.price,
      0
    );
    return (constructorItems.bun ? constructorItems.bun.price * 2 : 0) + res;
  }, [constructorItems]);

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
