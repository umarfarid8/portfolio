import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import Earth from '../canvas/Earth';
import { contactInfo } from '../constants';

const Contact = () => {
    const ref    = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const [form,    setForm]    = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status,  setStatus]  = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const validateForm = () => {
        const name = form.name.trim();
        const email = form.email.trim();
        const message = form.message.trim();

        if (!name || name.length < 2) {
            toast.error('Please enter your name (at least 2 characters).');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return false;
        }

        if (!message || message.length < 10) {
            toast.error('Please provide a message with at least 10 characters.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setStatus(null);

        const payload = {
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
            _subject: `New Portfolio Message from ${form.name.trim()}`,
            _template: 'table',
        };

        // Use backend API if set in environment or default to FormSubmit AJAX endpoint
        const backendUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/contact` : null;
        const formSubmitUrl = 'https://formsubmit.co/ajax/umarfarid034@gmail.com';

        try {
            if (backendUrl) {
                const res = await axios.post(backendUrl, form);
                if (res.data?.success) {
                    toast.success(res.data.message || 'Message sent successfully! 🎉');
                    setForm({ name: '', email: '', message: '' });
                    setStatus('success');
                    return;
                }
            }

            // Real submission via FormSubmit AJAX service directly to Umar's inbox
            const response = await fetch(formSubmitUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok && (data.success === 'true' || data.success === true || data.message)) {
                toast.success('Thank you! Your message has been sent successfully. 🎉');
                setForm({ name: '', email: '', message: '' });
                setStatus('success');
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (err) {
            console.error('Contact form submission error:', err);
            setStatus('error');
            toast.error('Unable to send automatically. You can email me directly at umarfarid034@gmail.com');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            ref={ref}
            className="relative py-24"
            style={{ background: 'var(--bg-alt)' }}
        >
            <div className="section-padding">
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="section-subheading"
                >
                    Let's Talk
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="section-heading mb-4"
                >
                    Get In <span className="gradient-text">Touch</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                    style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '32rem' }}
                >
                    Whether you have a project in mind, a job opportunity, or just want to say hi — my
                    inbox is always open.
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* ── Left: 3D Earth + contact info ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="flex flex-col gap-5"
                    >
                        <div className="rounded-2xl overflow-hidden" style={{
                            background: 'rgba(145,94,255,0.04)',
                            border: '1px solid rgba(145,94,255,0.15)',
                        }}>
                            <Earth />
                        </div>

                        {/* Contact info cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {contactInfo.map((info) => (
                                <motion.div
                                    key={info.label}
                                    className="glass-card p-4 flex items-start gap-3"
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <span className="text-xl flex-shrink-0" aria-hidden="true">{info.icon}</span>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-wider font-medium mb-0.5"
                                           style={{ color: 'var(--text-muted)' }}>
                                            {info.label}
                                        </p>
                                        {info.link ? (
                                            <a
                                                href={info.link}
                                                target={info.link.startsWith('http') ? '_blank' : undefined}
                                                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                className="text-sm hover:text-[#00FFFF] transition-colors break-all"
                                                style={{ color: 'var(--text-secondary)' }}
                                            >
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p className="text-sm break-all"
                                               style={{ color: 'var(--text-secondary)' }}>
                                                {info.value}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Open to work badge */}
                        <div className="flex justify-center">
                            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                                style={{
                                    background: 'rgba(34,197,94,0.1)',
                                    border: '1px solid rgba(34,197,94,0.35)',
                                    color: '#22c55e',
                                }}>
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Open to Work — Available for hire
                            </span>
                        </div>
                    </motion.div>

                    {/* ── Right: Contact Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.7 }}
                    >
                        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 flex flex-col gap-5" id="contact-form" noValidate>
                            <div>
                                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    Send me a message
                                </h3>
                                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                                    I'll reply to your email directly ✉️
                                </p>
                            </div>

                            {status === 'success' && (
                                <div className="p-4 rounded-xl text-sm" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80' }}>
                                    ✅ Thank you! Your message has been delivered to Umar Farid.
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-4 rounded-xl text-sm flex flex-col gap-2" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)', color: '#f87171' }}>
                                    <span>⚠️ Could not send message automatically.</span>
                                    <a
                                        href={`mailto:umarfarid034@gmail.com?subject=Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`}
                                        className="underline text-xs font-semibold text-white"
                                    >
                                        Click here to email directly via your mail client ↗
                                    </a>
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="contact-name" className="text-xs uppercase tracking-wider font-medium"
                                       style={{ color: 'var(--text-muted)' }}>
                                    Your Name
                                </label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="input-field"
                                    required
                                    autoComplete="name"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="contact-email" className="text-xs uppercase tracking-wider font-medium"
                                       style={{ color: 'var(--text-muted)' }}>
                                    Email Address
                                </label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="input-field"
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="contact-message" className="text-xs uppercase tracking-wider font-medium"
                                       style={{ color: 'var(--text-muted)' }}>
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project or opportunity..."
                                    rows={5}
                                    className="input-field resize-none"
                                    required
                                />
                            </div>

                            <motion.button
                                id="contact-submit-btn"
                                type="submit"
                                disabled={loading}
                                className="btn-primary justify-center mt-2 cursor-pointer"
                                style={{ opacity: loading ? 0.65 : 1 }}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                aria-label="Send contact message"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending message...
                                    </>
                                ) : '🚀 Send Message'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
