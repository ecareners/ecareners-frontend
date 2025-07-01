import IconTextFormInput from '@/components/form/IconTextFormInput';
import { BsEnvelopeFill } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import httpClient from '@/helpers/httpClient';
import { useAuth } from '@/context/useAuthContext';

const schema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});

const SignIn = () => {
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const res = await httpClient.post(`${API_BASE_URL}/api/login`, data);
      // Save user and token in Auth context
      login(res.data.user, res.data.token);
      // Redirect to intended page or home
      const params = new URLSearchParams(location.search);
      const redirectTo = params.get('redirectTo') || '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <div className="mb-4">
        <IconTextFormInput control={control} icon={BsEnvelopeFill} placeholder="E-mail" label="Email address *" name="email" />
      </div>
      <div className="mb-4">
        <IconTextFormInput type='password' control={control} icon={FaLock} placeholder="Password" label="Password *" name="password" />
      </div>
      <div className="align-items-center mt-0">
        <div className="d-grid">
          <button className="btn btn-primary mb-0" disabled={loading} type="submit">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </form>
  );
};
export default SignIn;
