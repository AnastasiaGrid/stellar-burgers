import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { refreshToken, registerUserApi } from '@api';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUser = {
    email,
    name: userName,
    password
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const result = await registerUserApi(dataUser);

      if (result) {
        // localStorage.setItem('refreshToken', refreshData.refreshToken);
        // setCookie('accessToken', refreshData.accessToken);
        navigate('/login');
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
