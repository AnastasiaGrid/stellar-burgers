import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from 'src/services/store';
import { getFeedsApiThunk } from '../../slices/feedSlice';
import { getIngredientsApiThunk } from '../../slices/ingredientsSlice';
import { getUserApiThunk } from '../../slices/userSlice';
import { Wrapper } from '../wrapper/wrapper';

const App = () => {
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const onClose = () => {
    navigate(-1);
  };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getIngredientsApiThunk());
    dispatch(getFeedsApiThunk());
    dispatch(getUserApiThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <Wrapper title={'Детали ингредиента'}>
              <IngredientDetails />
            </Wrapper>
          }
        />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='feed/:number'
          element={
            <Wrapper title={`#${orderNumber && orderNumber.padStart(6, '0')}`}>
              <OrderInfo />
            </Wrapper>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile/orders/:number'
          element={
            <Wrapper title={'Информация по заказу'}>
              <OrderInfo />
            </Wrapper>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='ingredients/:id'
            element={
              <Modal onClose={onClose} title={'Детали ингредиента'}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='feed/:number'
            element={
              <Modal
                onClose={onClose}
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='profile/orders/:number'
            element={
              <Modal onClose={onClose} title={'Информация по заказу'}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
