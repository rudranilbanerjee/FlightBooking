import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInApiSlice, loginApiDataReset } from '../../Store/Slice/ApiSlice/LoginUserApi';
import { UserContext } from './../../ContextApi/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { handleChangeField } from '../../Store/Slice/StateManagement/UserSlice';
import Loader from './../Loader/Loader';
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});
const LoginForm = ({ handleAuthentication }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [email, setEmail] = useState('newtestalta@yopmail.com');
    // const [password, setPassword] = useState('123456789');
    const memberRegData = useSelector((state) => {
        return state.signIn;
    })
    const { dummy } = useContext(UserContext)
    console.log(dummy)
    useEffect(() => {
        if (memberRegData.isSuccess && memberRegData.response[`main_data`][`res_code`] === 200) {
            console.log(memberRegData.response[`main_data`].data.profile)
            const { token, first_name, last_name, gender, email, profile_image } = memberRegData.response[`main_data`].data.profile;
            localStorage.setItem('JWT_KEY', token)
            toast.success(memberRegData.response[`main_data`].response, {
                position: toast.POSITION.TOP_RIGHT
            });
            handleAuthentication()
            dispatch(loginApiDataReset())
            dispatch(handleChangeField({
                signInEmail: email,
                firstName: first_name,
                lastName: last_name,
                gender: gender,
                profileImage: profile_image,
            }))
            setTimeout(() => {
                navigate(`/search-flight`);
            }, 1500)

        } else if (memberRegData?.response && memberRegData.response?.[`main_data`]?.[`res_code`] === 201) {
            toast.error(memberRegData.response[`main_data`].response, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(loginApiDataReset())
        }
    }, [dispatch, memberRegData])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Handle form submission logic here
            console.log('Form submitted:', values);
            const requestBody = {
                email: values.email,
                password: values.password,
            };
            try {
                await dispatch(logInApiSlice({
                    method: 'post',
                    url: 'v2/auth/login',
                    data: requestBody,
                }))
            } catch (error) {
                console.error('Error:', error);
            }
        },
    });
    return (
        <div>
            <div className="container mt-5 login-Container" style={{ opacity: memberRegData.isLoading ? '0.6' : 1 }}>
                <h2>Log In Form</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={memberRegData.isLoading}>Submit</button>
                </form>
            </div>
            <ToastContainer />
            {memberRegData.isLoading && <Loader />}
        </div>
    );
};

export default LoginForm;