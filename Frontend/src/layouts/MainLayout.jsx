import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './layoutStyles.css';

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Navbar />
            <main className="content">
                <Outlet /> {/* This renders the matched child route */}
            </main>
        </div>
    );
};

export default MainLayout;