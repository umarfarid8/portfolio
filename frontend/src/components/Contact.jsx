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

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/contact', form);
            if (res.data?.success) {
                toast.success(res.data.message || 'Message sent! 🎉');
                setForm({ name: '', email: '', message: '' });
            } else {
                toast.error(res.data?.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to send. Please email me at umarfarid034@gmail.com');
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
                                    <span className="text-xl flex-shrink-0">{info.icon}</span>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-wider font-medium mb-0.5"
                                           style={{ color: 'var(--text-muted)' }}>
                                            {info.label}
                                        </p>
                                        {info.link ? (
                                            <a
                                                href={info.link}
                                                target={info.link.startsWith('http') ? '_blank' : undefined}
                                                rel="noopener noreferrer"
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
                        <form onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-5">
                            <div>
                                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    Send me a message
                                </h3>
                                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                                    I'll reply to your email directly ✉️
                                </p>
                            </div>

                            {[
                                { id: 'name',    label: 'Your Name',     type: 'text',  placeholder: 'John Doe'               },
                                { id: 'email',   label: 'Email Address', type: 'email', placeholder: 'john@example.com'        },
                            ].map(({ id, label, type, placeholder }) => (
                                <div key={id} className="flex flex-col gap-1.5">
                                    <label className="text-xs uppercase tracking-wider font-medium"
                                           style={{ color: 'var(--text-muted)' }}>
                                        {label}
                                    </label>
                                    <input
                                        name={id}
                                        type={type}
                                        value={form[id]}
                                        onChange={handleChange}
                                        placeholder={placeholder}
                                        className="input-field"
                                        required
                                    />
                                </div>
                            ))}

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs uppercase tracking-wider font-medium"
                                       style={{ color: 'var(--text-muted)' }}>
                                    Message
                                </label>
                                <textarea
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
                                type="submit"
                                disabled={loading}
                                className="btn-primary justify-center mt-2"
                                style={{ opacity: loading ? 0.65 : 1 }}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
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
