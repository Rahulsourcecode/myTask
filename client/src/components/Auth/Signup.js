import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Signup() {
  // Define the initial form values
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    termsAndConditions: false,
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    username: Yup.string().min(8, 'Username must be at least 8 characters').required('Username is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    mobile: Yup.string().min(8, 'Mobile number must be at least 8 characters').required('Mobile number is required'),
    termsAndConditions: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
    },
  });

  return (
    <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100 ">
      <div className="w-100 h-90 p-3 p-md-5 card border-0 bg-dark text-light" style={{ maxWidth: '32rem' }}>
        <form className="row g-1 p-3 p-md-4" onSubmit={formik.handleSubmit}>
          <div className="col-12 text-center mb-1 mb-lg-5">
            <h1>Create your account</h1>
            <span>Free access to our dashboard.</span>
          </div>
          <div className="col-6">
            <div className="mb-2">
              <label className="form-label">Full name</label>
              <input
                type="text"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                className="form-control form-control-md"
                placeholder="John"
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="text-danger">{formik.errors.firstname}</div>
              ) : null}
            </div>
          </div>
          {/* Other input fields */}
          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-lg btn-block btn-light lift text-uppercase" alt="SIGNUP">
              SIGN UP
            </button>
          </div>
          <div className="col-12 text-center mt-4">
            <span className="text-muted">
              Already have an account?{' '}
              <Link to={`${process.env.PUBLIC_URL}/sign-in`} title="Sign in" className="text-secondary">
                Sign in here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
