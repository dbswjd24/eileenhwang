import React from 'react';
import '../styling/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-item">
                <div className="icon home-icon">
                    <img src="../image/home.png" alt='home'/>
                </div>
                <div className="icon-text">Home</div>
            </div>
            <div className="footer-item">
                <div className="icon plan-icon">
                    <img src='../image/plan.png' alt='plan'/>
                </div>
                <div className="icon-text">Plan</div>
            </div>
            <div className="footer-item">
                <div className="icon account-icon">
                    <img src='../image/account.png' alt='account'/>
                </div>
                <div className="icon-text">Account</div>
            </div>
        </footer>
    );
};

export default Footer;