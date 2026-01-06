import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleClientRegister = () => {
        navigate('/user-register');
    };

    const handleEmployeeRegister = () => {
        navigate('/employee-register');
    };

    return (
        <div className="hp-container">
            {/* Navigation Header */}
            <header className="hp-header">
                <nav className="hp-nav">
                    <div className="hp-nav-container">
                        <div className="hp-logo">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#38b2ac"/>
                                <path d="M15 12L25 20L15 28V12Z" fill="white"/>
                                <path d="M28 15V25C28 26.6569 26.6569 28 25 28H15C13.3431 28 12 26.6569 12 25V15C12 13.3431 13.3431 12 15 12H25C26.6569 12 28 13.3431 28 15Z" fill="white" opacity="0.2"/>
                            </svg>
                            <span className="hp-logo-text">MHC SOLAR</span>
                        </div>
                        
                        <div className={`hp-nav-menu ${mobileMenuOpen ? 'hp-mobile-open' : ''}`}>
                            <a href="#features" className="hp-nav-link">Features</a>
                            <a href="#services" className="hp-nav-link">Services</a>
                            <a href="#about" className="hp-nav-link">About</a>
                            <a href="#contact" className="hp-nav-link">Contact</a>
                            <Link to="/login" className="hp-nav-link">Consumer Login</Link>
                            <Link to="/login" className="hp-nav-link">Employee Login</Link>
                        </div>
                        
                        <button 
                            className="hp-mobile-menu-toggle"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Hero Section with Banner Image */}
            <section className="hp-hero">
                <div className="hp-hero-banner">
                    <img 
                        src="https://static.langimg.com/nbt/thumb/116335294/solar-pannel-nbt.jpg?imgsize=45318&width=1600&height=900&resizemode=75" 
                        alt="Solar panels installation" 
                        className="hp-banner-image"
                    />
                    <div className="hp-hero-overlay"></div>
                </div>
                <div className="hp-hero-content">
                    <div className="hp-hero-text">
                        <h1 className="hp-hero-title">
                            Power Your Future with <span className="hp-highlight">Solar Energy</span>
                        </h1>
                        <p className="hp-hero-subtitle">
                            Join thousands of satisfied customers who have made the switch to clean, renewable energy. 
                            Save money, reduce your carbon footprint, and gain energy independence.
                        </p>
                        <div className="hp-hero-stats">
                            <div className="hp-stat">
                                <span className="hp-stat-number">10,000+</span>
                                <span className="hp-stat-label">Happy Customers</span>
                            </div>
                            <div className="hp-stat">
                                <span className="hp-stat-number">50MW+</span>
                                <span className="hp-stat-label">Installed Capacity</span>
                            </div>
                            <div className="hp-stat">
                                <span className="hp-stat-number">15+</span>
                                <span className="hp-stat-label">Years Experience</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Section */}
            <section className="hp-registration">
                <div className="hp-registration-container">
                    <h2 className="hp-section-title">Join Our Solar Community</h2>
                    <p className="hp-section-subtitle">
                        Whether you're looking to install solar panels or join our team, we have the perfect opportunity for you
                    </p>
                    
                    <div className="hp-registration-cards">
                        <div className="hp-reg-card hp-client-card">
                            <div className="hp-reg-icon">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                            </div>
                            <h3 className="hp-reg-title">Register Consumer</h3>
                            <p className="hp-reg-description">
                                Get started with solar installation for your home or business. 
                                Free consultation, expert installation, and government subsidies available.
                            </p>
                            <ul className="hp-reg-features">
                                <li>Free site assessment</li>
                                <li>Government subsidy assistance</li>
                                <li>Professional installation</li>
                                <li>24/7 support</li>
                            </ul>
                            <button className="hp-reg-button hp-client-button" onClick={handleClientRegister}>
                                Get Started
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>

                        <div className="hp-reg-card hp-employee-card">
                            <div className="hp-reg-icon">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h3 className="hp-reg-title">Join Our Team</h3>
                            <p className="hp-reg-description">
                                Become part of India's growing solar industry. 
                                We offer competitive salaries, training, and career growth opportunities.
                            </p>
                            <ul className="hp-reg-features">
                                <li>Competitive compensation</li>
                                <li>Professional training</li>
                                <li>Career advancement</li>
                                <li>Work with latest technology</li>
                            </ul>
                            <button className="hp-reg-button hp-employee-button" onClick={handleEmployeeRegister}>
                                Apply Now
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="hp-features">
                <div className="hp-features-container">
                    <h2 className="hp-section-title">Why Choose Solar Energy?</h2>
                    <div className="hp-features-grid">
                        <div className="hp-feature">
                            <div className="hp-feature-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </div>
                            <h3 className="hp-feature-title">Save Money</h3>
                            <p className="hp-feature-description">
                                Reduce your electricity bills by up to 80% with solar energy
                            </p>
                        </div>
                        <div className="hp-feature">
                            <div className="hp-feature-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h3 className="hp-feature-title">Go Green</h3>
                            <p className="hp-feature-description">
                                Reduce your carbon footprint and help create a sustainable future
                            </p>
                        </div>
                        <div className="hp-feature">
                            <div className="hp-feature-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 6v6l4 2"></path>
                                </svg>
                            </div>
                            <h3 className="hp-feature-title">Energy Independence</h3>
                            <p className="hp-feature-description">
                                Generate your own power and reduce dependency on the grid
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="hp-services">
                <div className="hp-services-container">
                    <h2 className="hp-section-title">Our Services</h2>
                    <div className="hp-services-grid">
                        <div className="hp-service">
                            <h3 className="hp-service-title">Residential Solar</h3>
                            <p className="hp-service-description">
                                Complete solar solutions for homes with rooftop installations
                            </p>
                        </div>
                        <div className="hp-service">
                            <h3 className="hp-service-title">Commercial Solar</h3>
                            <p className="hp-service-description">
                                Large-scale solar installations for businesses and industries
                            </p>
                        </div>
                        <div className="hp-service">
                            <h3 className="hp-service-title">Solar Water Heaters</h3>
                            <p className="hp-service-description">
                                Energy-efficient water heating solutions for all needs
                            </p>
                        </div>
                        <div className="hp-service">
                            <h3 className="hp-service-title">Maintenance & Support</h3>
                            <p className="hp-service-description">
                                24/7 maintenance and support for all solar installations
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="hp-about">
                <div className="hp-about-container">
                    <div className="hp-about-content">
                        <h2 className="hp-section-title">About SolarSolutions</h2>
                        <p className="hp-about-text">
                            With over 15 years of experience in the solar industry, we are one of India's 
                            leading solar solution providers. We have successfully completed over 10,000 installations 
                            across the country, helping our customers save money while contributing to a greener planet.
                        </p>
                        <div className="hp-certifications">
                            <div className="hp-certification">
                                <span className="hp-cert-badge">ISO Certified</span>
                            </div>
                            <div className="hp-certification">
                                <span className="hp-cert-badge">MNRE Approved</span>
                            </div>
                            <div className="hp-certification">
                                <span className="hp-cert-badge">Govt. Empaneled</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="hp-contact">
                <div className="hp-contact-container">
                    <h2 className="hp-section-title">Get in Touch</h2>
                    <div className="hp-contact-info">
                        <div className="hp-contact-item">
                            <div className="hp-contact-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <div className="hp-contact-details">
                                <h4>Call Us</h4>
                                <p>985 483 9946</p>
                            </div>
                        </div>
                        <div className="hp-contact-item">
                            <div className="hp-contact-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <div className="hp-contact-details">
                                <h4>Email Us</h4>
                                <p>mhctechnologyservicespvtltd@gmail.com</p>
                            </div>
                        </div>
                        <div className="hp-contact-item">
                            <div className="hp-contact-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div className="hp-contact-details">
                                <h4>Visit Us</h4>
                                <p>Ganeshguri Guwahati assam near vishal mega mart</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="hp-footer">
                <div className="hp-footer-content">
                    <div className="hp-footer-logo">
                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" fill="#38b2ac"/>
                            <path d="M15 12L25 20L15 28V12Z" fill="white"/>
                        </svg>
                        <span>MHC SOLAR</span>
                    </div>
                    <p className="hp-footer-text">
                        © 2026 MHC SOLAR. All rights reserved. | Empowering India with Solar Energy
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;