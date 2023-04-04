import React from 'react';
import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ? (
        <div className="WelcomeScreen">
            <h1>Welcome to the Meet app</h1>
            <h4>
                Log in to see upcoming events around the world for full-stack
                developers
            </h4>

            <div
                style={{
                    display: 'flex',
                    width: '250px',
                    background: 'transparent',
                }}
            >
                <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google sign-in"
                    style={{
                        background: '#fff',
                        height: '49px',
                        width: '49px',
                        border: '1px solid black',
                        padding: '3px',
                    }}
                />

                <button
                    onClick={() => {
                        props.getAccessToken();
                    }}
                    rel="nofollow noopener"
                    className="btn-text"
                >
                    <p>Sign in with google</p>
                </button>
            </div>
            <a
                href="https://mats-js.github.io/meet/privacy.html"
                rel="nofollow noopener"
            >
                Privacy policy
            </a>
        </div>
    ) : null;
}
export default WelcomeScreen;
