import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/argentBankLogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { disconnect } from '../../lib/redux/Slices/userSlice'; 
import './Header.css';

function Header() {
    const userToken = useSelector((state) => state.user.token);

    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(disconnect());
    };

    const { userName } = useSelector(state => state.user.profile);

    return (
        <header className='header'>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img
                        className="main-nav-logo-image"
                        src={Logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {userToken ? (
                        <div className='main-nav-infos'>
                            <Link className="user-link" to="/">
                                {userName}
                                <i className="fa fa-user-circle"></i>
                            </Link>
                            <Link className="main-nav-item" to="/" onClick={handleSignOut}>
                                Sign Out
                            </Link>
                        </div>
                    ) : (
                        <Link className="main-nav-item" to="/login">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </header> 
    );
  }
  
  export default Header;