import React from 'react';
import './login.css';

const Login = () => {
  return (
    <div className="background">
      <img src="/image/back.png" alt="Background" />
      <div className="container">
        <div className="login-box">
          <div className="nav">
            <div className="logo">
              <img src="/image/logo.png" alt="Logo" />
            </div>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="#">Our products</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
            <button className="signup-btn"><a href="/signup">Sign up</a></button>
          </div>
          <div className="content">
            <div className="login-form">
              <h2>Login</h2>
              <form>
                <div className="input-group">
                  <input type="text" placeholder="Email or phone number" />
                </div>
                <div className="input-group">
                  <input type="password" placeholder="Password" />
                </div>
                <a href="#" className="forgot-password">Forgot your password?</a>
                <button type="submit" className="login-btn">Login</button>
              </form>
            </div>
            <div className="image-section">
              <img src="/image/unnamed.png" alt="Login Illustration" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;