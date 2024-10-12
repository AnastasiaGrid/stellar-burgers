import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUserApi } from '@api';
import { log } from 'console';
import { setCookie } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { addUserData } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await loginUserApi({ email, password });
      localStorage.setItem('refreshToken', result.refreshToken);
      setCookie('accessToken', result.accessToken);
      dispatch(addUserData(result.user));
      navigate('/profile');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoginUI
      errorText={error}
      loading={loading}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
