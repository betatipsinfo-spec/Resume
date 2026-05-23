import React, { useState, useRef, useEffect } from 'react';
import { 
    Sparkles, 
    Palette, 
    AlignLeft, 
    Database, 
    Trash2, 
    Download, 
    Loader2,
    Cloud
} from 'lucide-react';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import AuthModal from './components/AuthModal';
import { initialEmptyData, sampleProfileData } from './data/sampleData';
import { supabase } from './lib/supabaseClient';
import './App.css';

export default function App() {
    const [formData, setFormData] = useState(initialEmptyData);
    const [activeTemplate, setActiveTemplate] = useState('attractive');
    const [isGenerating, setIsGenerating] = useState(false);
    const [session, setSession] = useState(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    
    // Cloud Dashboard State Tracking
    const [currentResumeId, setCurrentResumeId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const previewRef = useRef(null);

    // Authentication session state synchronization
    useEffect(() => {
        // Fetch current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // Listen for session alterations
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (!session) {
                // Clear active dashboard reference when signing out
                setCurrentResumeId(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Dynamic loaders
    const handleLoadSample = () => {
        setFormData(sampleProfileData);
        setCurrentResumeId(null); // Reset DB reference for sample
    };

    const handleClearForm = () => {
        if (window.confirm("Are you sure you want to clear all details? This will reset the workspace.")) {
            setFormData(initialEmptyData);
            setCurrentResumeId(null); // Reset active DB reference
        }
    };

    const switchTemplate = (templateName) => {
        setActiveTemplate(templateName);
    };

    // Client-side PDF Compiler
    const handleDownloadPDF = () => {
        // Condition: Prompt login overlay if unauthenticated
        if (!session) {
            setIsAuthOpen(true);
            return;
        }
        triggerActualDownload();
    };

    // Callback once authentication triggers successfully in AuthModal
    const handleAuthSuccess = () => {
        setIsAuthOpen(false);
        // Brief timeout for smooth visual transition
        setTimeout(() => {
            triggerActualDownload();
        }, 300);
    };

    // High Density PDF export compilation
    const triggerActualDownload = () => {
        const element = previewRef.current;
        if (!element) return;

        const fullname = formData.fullname.trim() || 'Resume';
        const cleanFilename = `${fullname.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`;

        setIsGenerating(true);

        const options = {
            margin: [5, 5, 5, 5],
            filename: cleanFilename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true, 
                letterRendering: true,
                scrollY: 0,
                scrollX: 0
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };

        if (window.html2pdf) {
            window.html2pdf().from(element).set(options).outputPdf('blob')
                .then(async (blob) => {
                    // 1. Trigger local browser file download immediately (tactile UX)
                    const downloadUrl = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = cleanFilename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(downloadUrl);

                    // 2. Silently archive binary PDF in Supabase Storage under user_id folder
                    try {
                        const fileId = currentResumeId || `standalone_${Date.now()}`;
                        const filePath = `${session.user.id}/${fileId}.pdf`;

                        const { data, error: uploadError } = await supabase.storage
                            .from('resumes_pdf')
                            .upload(filePath, blob, {
                                contentType: 'application/pdf',
                                upsert: true
                            });

                        if (uploadError) throw uploadError;

                        // 3. Link the pdf_path inside resumes DB table if referencing a valid save draft
                        if (currentResumeId) {
                            const { error: dbError } = await supabase
                                .from('resumes')
                                .update({ pdf_path: filePath })
                                .eq('id', currentResumeId);

                            if (dbError) throw dbError;
                            
                            // Re-fetch lists to sync cloud badge
                            setRefreshKey(prev => prev + 1);
                        }
                    } catch (uploadErr) {
                        console.error('Failed to upload PDF archive to Supabase:', uploadErr);
                    } finally {
                        setIsGenerating(false);
                    }
                })
                .catch(err => {
                    console.error('PDF Generation failed: ', err);
                    alert('Something went wrong during PDF generation. Please try again.');
                    setIsGenerating(false);
                });
        } else {
            alert('PDF compiler engine is not fully loaded yet. Please wait a second and retry.');
            setIsGenerating(false);
        }
    };

    // Save active resume draft into public.resumes Supabase table
    const handleSaveResume = async () => {
        if (!session) {
            setIsAuthOpen(true);
            return;
        }

        const defaultName = formData.fullname.trim() ? `${formData.fullname} - Resume` : 'My Resume';
        const name = prompt("Enter a name for this resume:", defaultName);
        if (!name) return;

        try {
            if (currentResumeId) {
                // Perform Update
                const { error } = await supabase
                    .from('resumes')
                    .update({
                        name,
                        template: activeTemplate,
                        content: formData,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', currentResumeId);

                if (error) throw error;
                alert('Resume updated successfully in your cloud dashboard!');
            } else {
                // Perform Insert
                const { data, error } = await supabase
                    .from('resumes')
                    .insert({
                        user_id: session.user.id,
                        name,
                        template: activeTemplate,
                        content: formData
                    })
                    .select();

                if (error) throw error;
                if (data && data[0]) {
                    setCurrentResumeId(data[0].id);
                }
                alert('Resume saved successfully in your cloud dashboard!');
            }
            
            // Increment refreshKey to trigger re-fetch inside EditorPanel
            setRefreshKey(prev => prev + 1);
        } catch (err) {
            console.error('Database save error:', err);
            alert('Failed to save resume draft: ' + err.message);
        }
    };

    return (
        <div className="app-container">
            {/* Header / Control Toolbar */}
            <header className="app-header">
                <div className="header-logo">
                    <div className="logo-icon">
                        <Sparkles />
                    </div>
                    <div className="logo-text">
                        <h1>ResuForge</h1>
                        <span>Craft Your Professional Story</span>
                    </div>
                </div>
                
                {/* Template Toggle Selector */}
                <div className="template-selector">
                    <span className="selector-label">Choose Template:</span>
                    <div className="toggle-group">
                        <button 
                            className={`toggle-btn ${activeTemplate === 'attractive' ? 'active' : ''}`}
                            onClick={() => switchTemplate('attractive')}
                        >
                            <Palette size={16} />
                            <span>Attractive Blue</span>
                        </button>
                        <button 
                            className={`toggle-btn ${activeTemplate === 'plain' ? 'active' : ''}`}
                            onClick={() => switchTemplate('plain')}
                        >
                            <AlignLeft size={16} />
                            <span>Plain Classic</span>
                        </button>
                    </div>
                </div>

                {/* Main Actions Panel */}
                <div className="header-actions">
                    {/* User profile session badge */}
                    {session ? (
                        <div className="header-profile-badge">
                            <span className="user-email-text" title={session.user.email}>
                                {session.user.email}
                            </span>
                            <button 
                                className="btn-signout"
                                onClick={() => supabase.auth.signOut()}
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button 
                            className="btn btn-secondary" 
                            style={{ padding: '0.5rem 0.85rem' }}
                            onClick={() => setIsAuthOpen(true)}
                        >
                            Sign In
                        </button>
                    )}

                    <button 
                        className="btn btn-secondary" 
                        onClick={handleLoadSample}
                    >
                        <Database size={16} />
                        <span>Load Demo</span>
                    </button>
                    <button 
                        className="btn btn-danger" 
                        onClick={handleClearForm}
                    >
                        <Trash2 size={16} />
                        <span>Clear</span>
                    </button>

                    {/* Premium Cloud Saving Button */}
                    <button 
                        className="btn btn-secondary" 
                        style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--primary-bg)', color: 'var(--primary-color)' }}
                        onClick={handleSaveResume}
                    >
                        <Cloud size={16} />
                        <span>Save Draft</span>
                    </button>

                    <button 
                        className="btn btn-primary" 
                        onClick={handleDownloadPDF}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 size={16} className="spinning" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <Download size={16} />
                                <span>Download PDF</span>
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* Split layout workspace */}
            <main className="workspace">
                <EditorPanel 
                    formData={formData} 
                    setFormData={setFormData} 
                    activeTemplate={activeTemplate}
                    switchTemplate={switchTemplate}
                    session={session}
                    currentResumeId={currentResumeId}
                    setCurrentResumeId={setCurrentResumeId}
                    refreshKey={refreshKey}
                />
                <PreviewPanel 
                    formData={formData} 
                    activeTemplate={activeTemplate} 
                    previewRef={previewRef} 
                />
            </main>

            {/* Supabase Authentication Dialog Overlay */}
            <AuthModal 
                isOpen={isAuthOpen} 
                onClose={() => setIsAuthOpen(false)} 
                onSuccess={handleAuthSuccess} 
            />

            {/* Inject custom spin keyframes style */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .spinning {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
}
