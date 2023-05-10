import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import { GoogleLogin } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login() {
  const handleLoginSuccess = async (response) => {
    const { tokenId } = response;
    try {
      // Send the token to your server for validation and to obtain user information
      const res = await axiosInstance.post('/auth/google/login', { token: tokenId });
      // Handle the response from the server as needed
      console.log(res.data);
    } catch (error) {
      // Handle error if authentication fails
      console.error(error);
    }
  };

  const handleLoginFailure = (error) => {
    // Handle error if login fails
    console.error(error);
  };

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Required'),
      password: Yup.string()
        .min(6, 'Password must be 6 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .required('Required')
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance
          .post(`auth/login`, values)
          .then((res) => {
            if (res.data.accessToken) {
              localStorage.setItem("user", res.data.refreshToken);
            }
            return res.data;
          })
        navigate('/');
        window.location.reload();
      } catch (error) {
        setError(error.response.data.message);
      }
      // Panggil API login di sini dan verifikasi kredensial pengguna
    },
  })

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h1 className='text-center'>Login Page</h1>
          <form onSubmit={formik.handleSubmit}>
            {error && <div className="text-danger">{error}</div>}
            <div className="form-group mb-3">
              <label htmlFor="Email1">Email address</label>
              <input id='email' name='email' type="email" className="form-control" onChange={formik.handleChange} value={formik.values.email} placeholder="Enter email" />
            </div>
            {formik.errors.email && <p className='text-danger'>{formik.errors.email}</p>}
            <div className="form-group mb-3">
              <label htmlFor="Password1">Password</label>
              <input id='password' name='password' type="password" className="form-control" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" />
              {formik.errors.password && <p className='text-danger'>{formik.errors.password}</p>}
            </div>
            <button type="submit" className="btn btn-primary mb-3">Submit</button>
          </form>
          <p className="text-center"><a href="/register">Create an Account</a></p>

          <div className='text-center'>
            <p>Or log in with:</p>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
