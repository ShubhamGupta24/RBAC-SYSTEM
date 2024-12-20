import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../storeToken/auth";
import 'react-toastify/dist/ReactToastify.css';
import { MdWavingHand } from "react-icons/md";
import './style.css'

export const Register = () => {
    const { storeTokenInLS } = useAuth();

    const url = process.env.REACT_APP_BACKEND_CONNECT_API + "register"
    const [input, setInput] = useState({
        username: "",
        email: "",
        role: "",
        phone: "",
        password: "",
        location: ""
    });
    const handleChange = (e) => {
        e.preventDefault();
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const navigate = useNavigate();
    const IsValidate = () => {
        let isproceed = true;
        if (!input.email || !input.location || !input.password || !input.username || !input.phone || !input.role) {
            isproceed = false;
            toast.warning("empty credentials are not entertained");
        }


        return isproceed;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (IsValidate()) {
            try {
                console.log(url);

                const response = await axios.post(url, input);

                if (response.status === 201) {
                    const responseData = await response.data;
                    setInput({ username: "", email: "", role: "", phone: "", password: "", location: "" });
                    toast.success("Registration Successful");

                    // Storing the jwtToken in local storage
                    storeTokenInLS(responseData.token);
                    navigate("/")
                } else {
                    console.log("error inside response ", "error");
                }
            } catch (error) {
                console.log("Error", error);
            }
        }
    };

    return (
        <div className="box">
            <div className="welcome">
                <h1>WELCOME <MdWavingHand /></h1>
                Ready to shop 'til you drop? Sign up now and let the addiction begin!
            </div>
            <div className='form' >
                <h1>Register</h1>
                <div className='input-field'>
                    <label htmlFor="username">Username</label>
                    <input className='input'
                        type="text"
                        placeholder='Enter username'
                        id='username'
                        name='username'
                        autoComplete='off'
                        onChange={handleChange}
                        value={input.username} />
                </div>
                <div className='input-field'>
                    <label htmlFor="email">Email</label>
                    <input className='input'
                        type="email"
                        placeholder='Enter email'
                        id='email'
                        name='email'
                        autoComplete='off'
                        onChange={handleChange}
                        value={input.email} />
                </div>
                <div className='input-field'>
                    <label htmlFor="role">Role</label>
                    <input className='input'
                        type="text"
                        placeholder='Enter role'
                        id='role'
                        name='role'
                        autoComplete='off'
                        onChange={handleChange}
                        value={input.role} />
                </div>
                <div className='input-field'>
                    <label htmlFor="password">Password</label>
                    <input className='input'
                        type="password"
                        placeholder='Enter password'
                        id='password'
                        name='password'
                        autoComplete='off'
                        onChange={handleChange}
                        value={input.password}
                    />
                </div>
                <div className='input-field'>
                    <label htmlFor="phone">Phone</label>
                    <input className='input'
                        type="text"
                        placeholder='Enter phone number'
                        id='phone'
                        name='phone'
                        autoComplete='off'
                        onChange={handleChange}
                        value={input.phone}
                    />
                </div>
                <div className='input-field'>
                    <label htmlFor="location">Location</label>
                    <input className='input'
                        type="text"
                        placeholder='Enter Your Location'
                        id='location'
                        name='location'
                        autoComplete='off'
                        onChange={handleChange}
                        value={input.location} />
                </div>
                <div className='btn-container'>
                    <button className='bttn' type='Submit' onClick={handleSubmit}>Submit</button>
                </div>

                <div>
                    <Link className='link' to='/Login'>Already A User? Login Here</Link>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
};
export default Register;