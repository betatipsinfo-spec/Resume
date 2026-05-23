import React, { useState } from 'react';
import { 
    X, 
    Lock, 
    Mail, 
    Sparkles, 
    AlertCircle, 
    CheckCircle2, 
    Info 
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
    const [activeTab, setActiveTab] = useState('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!isOpen) return null;

    const handleAuthAction = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all email and password fields.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);

        try {
            if (activeTab === 'signin') {
                // Supabase Sign In
                const { data, error: authError } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password: password
                });

                if (authError) throw authError;

                setSuccess('Signed in successfully! Downloading resume...');
                setTimeout(() => {
                    setLoading(false);
                    onSuccess(); // Triggers PDF download in parent
                }, 1000);

            } else {
                // Supabase Sign Up
                const { data, error: authError } = await supabase.auth.signUp({
                    email: email.trim(),
                    password: password
                });

                if (authError) throw authError;

                // Check if session was created instantly or confirmation is needed
                if (data?.session) {
                    setSuccess('Account created and signed in! Downloading resume...');
                    setTimeout(() => {
                        setLoading(false);
                        onSuccess();
                    }, 1000);
                } else {
                    setSuccess('Registration successful! Please check your email for a confirmation link.');
                    setLoading(false);
                    // Don't close immediately since they need to confirm or click sign in tab
                }
            }
        } catch (err) {
            console.error('Auth error:', err);
            let userMsg = err.message || 'Authentication failed. Please verify credentials.';
            if (userMsg.toLowerCase().includes('email not confirmed')) {
                userMsg = 'Email verification required! Please click the confirmation link sent to your inbox during sign up, then try logging in again.';
            }
            setError(userMsg);
            setLoading(false);
        }
    };

    return (
        <div className="auth-overlay" onClick={onClose}>
            {/* Prevent overlay click from closing when clicking the card */}
            <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="auth-close-btn" onClick={onClose} aria-label="Close modal">
                    <X size={18} />
                </button>

                <div className="auth-modal-header">
                    <h3>
                        <Sparkles style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: 'var(--primary-light)' }} size={18} />
                        <span>ResuForge Account</span>
                    </h3>
                    <p>Unlock premium features & downloads</p>
                </div>

                {/* Nice visual notice bar */}
                <div className="auth-notice-bar">
                    <Info size={16} />
                    <span>Create a free account or sign in to instantly compile and download your resume in PDF format!</span>
                </div>

                {/* Tabs */}
                <div className="auth-tabs">
                    <button 
                        className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('signin'); setError(''); setSuccess(''); }}
                    >
                        Sign In
                    </button>
                    <button 
                        className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('signup'); setError(''); setSuccess(''); }}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Alert states */}
                {error && (
                    <div className="auth-error-alert">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="auth-success-alert">
                        <CheckCircle2 size={16} />
                        <span>{success}</span>
                    </div>
                )}

                {/* Form */}
                <form className="auth-form" onSubmit={handleAuthAction} style={{ marginTop: '1rem' }}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ paddingLeft: '2.25rem' }}
                                disabled={loading}
                                required
                            />
                            <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ paddingLeft: '2.25rem' }}
                                disabled={loading}
                                required
                            />
                            <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
                        disabled={loading}
                    >
                        {loading ? (
                            <span>Please wait...</span>
                        ) : (
                            <span>{activeTab === 'signin' ? 'Sign In & Download' : 'Sign Up Free'}</span>
                        )}
                    </button>

                    {activeTab === 'signup' && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.50rem', textAlign: 'center', lineHeight: '1.3' }}>
                            * Note: A verification link will be sent to your inbox. You must confirm your email before you can log in later!
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
