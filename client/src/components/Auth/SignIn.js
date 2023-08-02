import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleImg from "../../assets/images/google.svg";
import { Axios } from "../../utils/Axios";
import { useDispatch } from "react-redux";
import { setState } from "../../Redux/Slices/authSlices";
import { login } from "../../utils/api";

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear previous error message
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Frontend validation for required fields
        let validationErrors = {};
        if (!user.username) {
            validationErrors.username = "Username is required";
        }
        if (!user.password) {
            validationErrors.password = "Password is required";
        }

        if (Object.keys(validationErrors).length > 0) {
            // If there are validation errors, update the error state and prevent form submission
            setErrors(validationErrors);
        } else {
            // Otherwise, proceed with login
            const res = await login(user).then((res) => {
                dispatch(setState(res?.data));
                navigate(`${process.env.PUBLIC_URL}/${res?.data?.roles[0]}`);
            });
        }
    }

    return (
        <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
            <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{ maxWidth: "32rem" }}>
                <form className="row g-1 p-3 p-md-4">
                    <div className="col-12 text-center mb-1 mb-lg-5">
                        <h1>Sign in</h1>
                        <span>Free access to our dashboard.</span>
                    </div>

                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Username:</label>
                            <input
                                type="text"
                                value={user.username}
                                name="username"
                                className={`form-control form-control-lg ${errors.username ? "is-invalid" : ""}`}
                                placeholder="Enter username"
                                onChange={handleChange}
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="mb-2">
                            <div className="form-label">
                                <span className="d-flex justify-content-between align-items-center">Password</span>
                            </div>
                            <input
                                type="password"
                                value={user.password}
                                name="password"
                                className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""}`}
                                placeholder="***************"
                                onChange={handleChange}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Remember me
                            </label>
                        </div>
                    </div>

                    <div className="col-12 text-center mt-4">
                        <button onClick={handleSubmit} className="btn btn-lg btn-block btn-light lift text-uppercase" atl="signin">
                            SIGN IN
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
