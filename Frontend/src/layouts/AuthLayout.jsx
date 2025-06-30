import React from 'react';
import { Outlet } from 'react-router-dom';
import './layoutStyles.css';

const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <div className="auth-content">
                <Outlet /> {/* This renders child auth routes */}
            </div>
        </div>
    );
};

export default AuthLayout;