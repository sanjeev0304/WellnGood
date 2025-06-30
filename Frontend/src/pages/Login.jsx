import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import googleIcon from '../assets/google-icon.svg';
import signInGoogle from '../auth/signInGoogle';

const Login = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleSignUp = () => {
    containerRef.current.classList.add(styles.rightPanelActive);
  };

  const handleSignIn = () => {
    containerRef.current.classList.remove(styles.rightPanelActive);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={`${styles.container}`} ref={containerRef}>

        {/* Sign Up Form */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className={styles.socialContainer}>
              <button
                type="button"
                className={styles.googleButton}
                onClick={() => signInGoogle(navigate)}
              >
                <img src={googleIcon} alt="Google" className={styles.googleIcon} />
                Sign up with Google
              </button>
            </div>
            <span>or</span>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <div className={styles.socialContainer}>
              <button
                type="button"
                className={styles.googleButton}
                onClick={() => signInGoogle(navigate)}
              >
                <img src={googleIcon} alt="Google" className={styles.googleIcon} />
                Sign in with Google
              </button>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <a href="#" className={styles.forgot}>Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us, please log in with your personal info</p>
              <button className={`${styles.ghost}`} onClick={handleSignIn}>Sign In</button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your details and start your journey with us</p>
              <button className={`${styles.ghost}`} onClick={handleSignUp}>Sign Up</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
