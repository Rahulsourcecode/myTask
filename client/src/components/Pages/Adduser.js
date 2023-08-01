import * as React from 'react';

import { useState, useEffect } from 'react'
import PageHeader from '../common/PageHeader';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, ButtonBase } from '@mui/material';
import { showNotification } from '../../utils/notifications';
import { Axios } from '../../utils/Axios';
import { addUser, getRoles, setRoles } from '../../utils/api';

import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';

// const AddUserSchema = Yup.object().shape({
//     firstname: Yup.string().required('Required'),
//     lastname: Yup.string().required('Required'),
//     email: Yup.string().email('Invalid email').required('Required'),
//     password: Yup.string().required('Required'),
//     confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
//     username: Yup.string().required('Required'),
//     number: Yup.number().required('Required'),
//     role: Yup.array(),
// });


const AddUser = () => {

    const [options, setOptions] = useState([])
    useEffect(() => {
        async function getRoleData() {
            const res = await getRoles()
            const data = res.data.map(x=>x.role)
            setOptions(data)
            console.log(res);
        }
        getRoleData()
    }, [])
    const [error, setError] = useState(false)
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        username: "",
        mobile: "",
        roles: [],
    });

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmpassword: "",
            username: "",
            mobile: "",
        },
        validationSchema: Yup.object({
            firstname: Yup
                .string()
                .max(255)
                .required('Name is required'),
            lastname: Yup
                .string()
                .max(255)
                .required('Name is required'),
            username: Yup.string()
                .required('Required'),
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            mobile: Yup.string()
                .test('mobile', 'Must be a valid phone number', (value) => {
                    const phoneRegExp = /^[0-9]{10}$/;
                    return phoneRegExp.test(value);
                })
                .required('Phone number is required'),
            password: Yup
                .string()
                .max(255)
                .required('Password is required'),
            confirmpassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
            role: Yup.array(),
        }),
        onSubmit: async (values, helpers) => {
            try {
                const { email, firstname, lastname, mobile, password, username } = values
                setUser({ ...user, email, firstname, lastname, username, mobile, password })
                handleSubmit(values)
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });
    function handlePermissionsChange(event, value) {
        setError(false)
        setUser({ ...user, roles: value });
    }
    function handleSubmit(values) {
        if (user?.roles?.length) {
            addUser({ ...user, ...values })
        } else {
            setError(true)
        }
    }
    return (
        <div>
            <PageHeader headerTitle="Add User" />
            <div className="card mb-3">
                <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                </div>
                <div className="card-body">
                    <form id="basic-form" onSubmit={formik.handleSubmit}>
                        <div className="row g-3 align-items-center">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">firstname:</label>
                                    <input type="text" name='firstname' className="form-control parsley-error" value={formik.values.firstname} onChange={formik.handleChange} required />
                                    {formik.touched.firstname && formik.errors.firstname ? (
                                        <div className="text-danger">{formik.errors.firstname}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">lastname:</label>
                                    <input type="text" name='lastname' className="form-control parsley-error" value={formik.values.lastname} onChange={formik.handleChange} required />
                                    {formik.touched.lastname && formik.errors.lastname ? (
                                        <div className="text-danger">{formik.errors.lastname}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">email:</label>
                                    <input type="text" name='email' className="form-control parsley-error" value={formik.values.email} onChange={formik.handleChange} required />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-danger">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">username:</label>
                                    <input type="text" name='username' className="form-control parsley-error" value={formik.values.username} onChange={formik.handleChange} required />
                                    {formik.touched.username && formik.errors.username ? (
                                        <div className="text-danger">{formik.errors.username}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">password:</label>
                                    <input type="text" name='password' className="form-control parsley-error" value={formik.values.password} onChange={formik.handleChange} required />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-danger">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">confirmpassword:</label>
                                    <input type="text" name='confirmpassword' className="form-control parsley-error" value={formik.values.confirmpassword} onChange={formik.handleChange} required />
                                    {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                                        <div className="text-danger">{formik.errors.confirmpassword}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">mobile:</label>
                                    <input type="text" name='mobile' className="form-control parsley-error" value={formik.values.mobile} onChange={formik.handleChange} required />
                                    {formik.touched.mobile && formik.errors.mobile ? (
                                        <div className="text-danger">{formik.errors.mobile}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label">select an option:</label>
                                    <Autocomplete
                                        multiple
                                        id="tags-filled"
                                        name="role"
                                        onChange={handlePermissionsChange}
                                        value={user.roles}
                                        options={options ? options : []}
                                        // defaultValue={[options[1]]}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="filled"
                                                label="choose access"
                                            />
                                        )}
                                    />
                                    {error ? (
                                        <div className="text-danger">please select a role</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-secondary mt-5 me-1" onClick={() => { showNotification("added"); }}>Go home</button>
                        <button type="submit" className="btn btn-primary mt-5" >Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser;