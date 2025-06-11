import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { EyeIcon } from '../../../icons/icons'
import useApiRequest from "../../../hooks/useApiRequest";
import { successMsg, errorMsg } from "../../../utils/customFn";
import { API_ENDPOINTS } from "../../../constants/endPoints";
import { useNavigate } from 'react-router-dom';
import { isloginSuccess } from "../../../redux/slice/authSlice";
import { useDispatch, useSelector } from 'react-redux'
const baseUrl=process.env.REACT_APP_BASE_URL
const LoginForm = () => {
    const dispatch = useDispatch()

    const { fetchData } = useApiRequest()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            const loginRes = await fetchData(API_ENDPOINTS.login, navigate, "POST", { username:email, password });
            if (loginRes?.success) {
                localStorage.setItem("auth_token", loginRes?.data?.token);
                localStorage.setItem("username", loginRes?.data?.username);

                dispatch(isloginSuccess());
                successMsg(loginRes?.message)
                navigate(`${baseUrl}`)
            } else {
                errorMsg(loginRes?.message)
            }

        } catch (erorr) {
            console.log(erorr)
            errorMsg(erorr.response?erorr.response.data?erorr.response.data:erorr.response.message?erorr.response.message:erorr.response:erorr.response)

        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };


    return (
        <div className='login'>
            <div className='form_card'>
                <div className='main_heading'>
                    <h2>Sign In</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form_control'>
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder='Enter your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form_control' style={{ position: 'relative' }}>
                        <label>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='eyeicon' onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '38px', cursor: 'pointer' }}>
                            <EyeIcon />
                        </div>
                    </div>
                    <div className='links'>
                        <Link to="/reset">Forgot password</Link>
                    </div>
                    <div className='submit_button'>
                        <button type='submit' className='btn_primary'>
                            Sign in
                        </button>
                    </div>
                    <div className='instructions'>
                        <span>Don’t have an account? Contact admin for account creation</span>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default LoginForm
