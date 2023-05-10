import React from 'react'
import { axiosInstance } from '../../lib/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      type: '',
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
          .post(`auth/register`, values)
        navigate('/login');
        window.location.reload();
      } catch (error) {
        setError(error.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h1 className='text-center'>Register Page</h1>
          <form onSubmit={formik.handleSubmit}>
            {error && <div className="text-danger">{error}</div>}
            <div className="form-group mb-3">
              <label htmlFor="Email1">Email address</label>
              <input id='email' name='email' type="email" className="form-control" onChange={formik.handleChange} value={formik.values.email} placeholder="Enter email" />
              {formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="Password1">Password</label>
              <input id='password' name='password' type="password" className="form-control" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" />
              {formik.errors.password && <p className="text-danger">{formik.errors.password}</p>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputPassword1">Account Type</label>
              <select id="type" name="type" onChange={formik.handleChange} value={formik.values.type} className="form-control">
                <option selected>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary mb-3">Submit</button>
          </form>
          <p className="text-center"><a href="/login">Already Have an Account? Login</a></p>
        </div>
      </div>
    </>
  )
}

export default Register
