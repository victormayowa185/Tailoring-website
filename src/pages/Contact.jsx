import React, { useState, useEffect, useRef } from 'react';
import '../styles/contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Refs for scroll animations
    const formCardRef = useRef(null);
    const infoCardsRef = useRef([]);
    const visualRef = useRef(null);
    const processStepsRef = useRef([]);
    const testimonialRef = useRef(null);

    const services = [
        'Bespoke Suit Tailoring',
        'Traditional Attire',
        "Women's Couture",
        'Alterations & Repairs',
        'Custom Shirt Making',
        'Wedding Attire',
        'Fabric Consultation'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                message: ''
            });
        }, 3000);
    };

    // Scroll animation effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observe all elements
        const elements = [
            formCardRef.current,
            visualRef.current,
            testimonialRef.current,
            ...infoCardsRef.current.filter(Boolean),
            ...processStepsRef.current.filter(Boolean)
        ];

        elements.forEach(element => {
            if (element) observer.observe(element);
        });

        return () => {
            elements.forEach(element => {
                if (element) observer.unobserve(element);
            });
        };
    }, []);

    return (
        <section className="contact-section">
            {/* Top accent */}
            <div className="services-top-accent"></div>

            {/* Decorative Background Elements */}
            <div className="contact-bg-pattern"></div>
            <div className="contact-bg-gradient"></div>

            <div className="contact-container">
                {/* Header Section */}
                <div className="contact-header">
                    <span className="contact-badge">Let's Create Together</span>
                    <h1 className="contact-title">
                        Craft Your Perfect
                        <span className="highlight"> Fit</span>
                    </h1>
                    <p className="contact-subtitle">
                        Schedule a personal consultation with our <b>Hassan Tailor Design</b>.
                        Every masterpiece begins with a conversation.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="contact-grid">
                    {/* Left Column - Form */}
                    <div className="contact-form-container">
                        <div ref={formCardRef} className="form-card">
                            <div className="form-header">
                                <div className="form-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                </div>
                                <h2>Book a Fitting</h2>
                                <p>Fill in the details below and we'll get back to you within 24 hours</p>
                            </div>

                            {isSubmitted ? (
                                <div className="success-message">
                                    <div className="success-icon">✓</div>
                                    <h3>Message Sent Successfully!</h3>
                                    <p>Our master tailor will contact you shortly to schedule your fitting.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            <span className="label-icon">👤</span>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Mensah"
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="email">
                                                <span className="label-icon">✉️</span>
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone">
                                                <span className="label-icon">📱</span>
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+233 00 000 0000"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="service">
                                            <span className="label-icon">🎯</span>
                                            Service Interested In
                                        </label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a service</option>
                                            {services.map((service, index) => (
                                                <option key={index} value={service}>{service}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">
                                            <span className="label-icon">💬</span>
                                            Your Vision & Requirements
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about your style preferences, occasion, measurements, or any specific requirements..."
                                            rows="4"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="submit-btn"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="loading-spinner"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Schedule Consultation
                                                <span className="btn-arrow">→</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info Cards */}
                        <div className="info-cards">
                            {[0, 1].map((index) => (
                                <div
                                    key={index}
                                    ref={el => infoCardsRef.current[index] = el}
                                    className="info-card"
                                >
                                    <div className="info-icon">
                                        {index === 0 ? '📍' : '⏰'}
                                    </div>
                                    <div className="info-content">
                                        <h4>{index === 0 ? 'Visit Our Atelier' : 'Working Hours'}</h4>
                                        {index === 0 ? (
                                            <>
                                                <p>Federal University of Owerri, Imo state. Nigeria.</p>
                                            </>
                                        ) : (
                                            <>
                                                <p>Mon - Fri: 9AM - 7PM</p>
                                                <p>Saturday: 10AM - 5PM</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Visual & Info */}
                    <div className="contact-visual">
                        <div ref={visualRef} className="visual-container">
                            <img
                                src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFpbG9yJTIwbWVhc3VyaW5nfGVufDB8fDB8fHww"
                                alt="Tailor consultation"
                                className="main-visual"
                                loading="lazy"
                            />
                            <div className="visual-overlay">
                                <div className="overlay-content">
                                    <h3>Expert Consultation</h3>
                                    <p>40+ precise measurements for perfect fit</p>
                                </div>
                            </div>
                        </div>

                        <div className="process-steps">
                            <h3 className="steps-title">Our Consultation Process</h3>
                            <div className="steps-list">
                                {[
                                    { icon: '💬', step: 'Initial Discussion', desc: 'Style & vision consultation' },
                                    { icon: '📏', step: 'Precision Measuring', desc: '40+ body measurements' },
                                    { icon: '🎨', step: 'Design Selection', desc: 'Fabric & style choices' },
                                    { icon: '✂️', step: 'Crafting Begins', desc: 'Master tailor takes over' }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        ref={el => processStepsRef.current[index] = el}
                                        className="step-item"
                                    >
                                        <div className="step-icon">{item.icon}</div>
                                        <div className="step-content">
                                            <h4>{item.step}</h4>
                                            <p>{item.desc}</p>
                                        </div>
                                        {index < 3 && <div className="step-connector"></div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div ref={testimonialRef} className="testimonial-card">
                            <div className="testimonial-content">
                                <p className="quote">
                                    "It all took a detail explanation to make all the difference.
                                    My Anakara fits like it was painted on!"
                                </p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">VM</div>
                                    <div className="author-info">
                                        <h4>Victor Mayowa</h4>
                                        <p>Frontend Developer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;