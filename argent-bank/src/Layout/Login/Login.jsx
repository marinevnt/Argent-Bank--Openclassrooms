import React from "react";
import "./Login.css";
import { useState} from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom' 
import { loginUser, getUserProfile } from "../../lib/redux/Slices/userSlice";
import { getAccounts } from '../../lib/redux/Slices/accountSlice';

function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLoginEvent = (e) => {
        console.log("handle login");
        e.preventDefault();
        dispatch(loginUser({email:username, password:password})).then((result) => {
            console.log(result);
            let token = result.payload;
            if(token)
            {
                dispatch(getUserProfile(token));
                dispatch(getAccounts());
                navigate("/profile");
            }
            else
            {
                console.log("Error while logging");
            }
        })
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleLoginEvent}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                    <button type='submit' className="sign-in-button" >Sign In</button>
                </form>
            </section>
        </main>
    );
}

export default Login;

//<Link href="./user.html" className="sign-in-button" >Sign In</Link>