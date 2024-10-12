import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutApi } from '@api';
import { deleteCookie } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { deleteUserData } from '../../slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logoutApi();
      if (res.success) {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        dispatch(
          deleteUserData({
            email: '',
            name: ''
          })
        );
        navigate('/login');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
