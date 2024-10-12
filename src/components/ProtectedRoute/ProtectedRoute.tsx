import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsAuthChecked,
  selectIsAuthenticated,
  selectLoginUserRequest,
  selectUser
} from '../../slices/userSlice';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { Preloader } from '@ui';
import { log } from 'console';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};
export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isAuthentication = useSelector(selectIsAuthenticated);
  const loginUserRequest = useSelector(selectLoginUserRequest);
  const location = useLocation();

  if (!isAuthChecked && loginUserRequest) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !isAuthentication) {
    return <Navigate replace to='/login' />;
  }
  if (onlyUnAuth && isAuthentication) {
    return <Navigate to='/profile' />;
  }
  return children;
};
