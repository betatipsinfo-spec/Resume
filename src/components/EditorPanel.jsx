import React, { useState, useEffect } from 'react';
import { 
    User, 
    FileText, 
    Briefcase, 
    GraduationCap, 
    FolderGit2, 
    Wrench, 
    Award, 
    Trash2, 
    Plus, 
    ChevronDown, 
    Edit3,
    Cloud,
    Download
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function EditorPanel({ 
    formData, 
    setFormData, 
    activeTemplate, 
    switchTemplate,
    session,
    currentResumeId,
    setCurrentResumeId,
    refreshKey
}) {
    const [activeSection, setActiveSection] = useState('personal');

    const toggleAccordion = (section) => {
        setActiveSection(prev => prev === section ? '' : section);
    };

    // Scalar Input Handlers
    const handleScalarChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Experience Repeaters
    const addExperience = () => {
        setFormData(prev => ({
            ...prev,
            experiences: [...prev.experiences, { id: `exp-${Date.now()}`, company: '', role: '', start: '', end: '', location: '', desc: '' }]
        }));
    };

    const removeExperience = (id) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences.filter(exp => exp.id !== id)
        }));
    };

    const updateExperience = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
        }));
    };

    // Education Repeaters
    const addEducation = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, { id: `edu-${Date.now()}`, school: '', degree: '', field: '', location: '', start: '', end: '', details: '' }]
        }));
    };

    const removeEducation = (id) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };

    const updateEducation = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
        }));
    };

    // Projects Repeaters
    const addProject = () => {
        setFormData(prev => ({
            ...prev,
            projects: [...prev.projects, { id: `proj-${Date.now()}`, name: '', roleTech: '', link: '', desc: '' }]
        }));
    };

    const removeProject = (id) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.filter(proj => proj.id !== id)
        }));
    };

    const updateProject = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj)
        }));
    };

    // Skills Repeaters
    const addSkill = () => {
        setFormData(prev => ({
            ...prev,
            skills: [...prev.skills, { id: `skill-${Date.now()}`, name: '', level: 80 }]
        }));
    };

    const removeSkill = (id) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s.id !== id)
        }));
    };

    const updateSkill = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.map(s => s.id === id ? { ...s, [field]: value } : s)
        }));
    };

    const [savedResumes, setSavedResumes] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (session && activeSection === 'saved-resumes') {
            fetchResumes();
        }
    }, [session, activeSection, refreshKey]);

    const fetchResumes = async () => {
        setFetching(true);
        try {
            const { data, error } = await supabase
                .from('resumes')
                .select('*')
                .order('updated_at', { ascending: false });

            if (error) throw error;
            setSavedResumes(data || []);
        } catch (err) {
            console.error('Error fetching resumes:', err);
        } finally {
            setFetching(false);
        }
    };

    const handleLoadResume = (resume) => {
        if (window.confirm(`Do you want to load "${resume.name}"? This will replace your current active draft in the editor.`)) {
            setFormData(resume.content);
            switchTemplate(resume.template);
            setCurrentResumeId(resume.id);
        }
    };

    const handleDeleteResume = async (e, id, name) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete "${name}" from your cloud dashboard?`)) {
            try {
                const { error } = await supabase
                    .from('resumes')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                setSavedResumes(prev => prev.filter(r => r.id !== id));
                if (currentResumeId === id) {
                    setCurrentResumeId(null);
                }
            } catch (err) {
                console.error('Error deleting resume:', err);
                alert('Failed to delete: ' + err.message);
            }
        }
    };

    const handleDownloadSavedPDF = async (e, pdfPath, name) => {
        e.stopPropagation();
        try {
            const { data, error } = await supabase.storage
                .from('resumes_pdf')
                .createSignedUrl(pdfPath, 60);

            if (error) throw error;
            if (data && data.signedUrl) {
                const link = document.createElement('a');
                link.href = data.signedUrl;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (err) {
            console.error('Error fetching PDF signed URL:', err);
            alert('Failed to retrieve PDF: ' + err.message);
        }
    };

    return (
        <section className="editor-panel">
            <div className="panel-header">
                <h2>
                    <Edit3 /> 
                    <span>Resume Details</span>
                </h2>
                <span className="panel-subtitle">Fill in your information below</span>
            </div>

            {/* Visual Template Selector inside Editor */}
            <div className="editor-template-picker" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: '#f8fafc' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem', display: 'block' }}>
                    Select Resume Style (2 Versions):
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div 
                        className={`template-card ${activeTemplate === 'attractive' ? 'active' : ''}`}
                        onClick={() => switchTemplate('attractive')}
                        style={{
                            border: `2px solid ${activeTemplate === 'attractive' ? 'var(--primary-light)' : 'var(--border-color)'}`,
                            borderRadius: '8px',
                            padding: '0.65rem 0.75rem',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s ease',
                            boxShadow: activeTemplate === 'attractive' ? 'var(--shadow-sm)' : 'none'
                        }}
                    >
                        <div style={{
                            width: '8px', height: '8px', borderRadius: '50%', 
                            backgroundColor: activeTemplate === 'attractive' ? 'var(--primary-light)' : '#cbd5e1'
                        }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>Version 1: Attractive</span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Modern, colored highlights</span>
                        </div>
                    </div>

                    <div 
                        className={`template-card ${activeTemplate === 'plain' ? 'active' : ''}`}
                        onClick={() => switchTemplate('plain')}
                        style={{
                            border: `2px solid ${activeTemplate === 'plain' ? 'var(--primary-light)' : 'var(--border-color)'}`,
                            borderRadius: '8px',
                            padding: '0.65rem 0.75rem',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s ease',
                            boxShadow: activeTemplate === 'plain' ? 'var(--shadow-sm)' : 'none'
                        }}
                    >
                        <div style={{
                            width: '8px', height: '8px', borderRadius: '50%', 
                            backgroundColor: activeTemplate === 'plain' ? 'var(--primary-light)' : '#cbd5e1'
                        }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>Version 2: ATS-Plain</span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>ATS-friendly, clean text</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-container">
                {/* 1. Personal Information */}
                <div className={`accordion-item ${activeSection === 'personal' ? 'active' : ''}`}>
                    <div className="accordion-trigger" onClick={() => toggleAccordion('personal')}>
                        <span className="trigger-title">
                            <User /> <span>Personal Information</span>
                        </span>
                        <ChevronDown className="chevron" />
                    </div>
                    <div className="accordion-content">
                        <div className="form-grid">
                            <div className="form-group col-span-2">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    value={formData.fullname} 
                                    onChange={(e) => handleScalarChange('fullname', e.target.value)} 
                                />
                            </div>
                            <div className="form-grid col-span-2" style={{ display: 'contents' }}>
                                <div className="form-group col-span-2">
                                    <label>Professional Title</label>
                                    <input 
                                        type="text" 
                                        placeholder="Senior Software Engineer" 
                                        value={formData.title} 
                                        onChange={(e) => handleScalarChange('title', e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="john.doe@example.com" 
                                    value={formData.email} 
                                    onChange={(e) => handleScalarChange('email', e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input 
                                    type="tel" 
                                    placeholder="+1 (555) 019-2834" 
                                    value={formData.phone} 
                                    onChange={(e) => handleScalarChange('phone', e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input 
                                    type="text" 
                                    placeholder="San Francisco, CA" 
                                    value={formData.location} 
                                    onChange={(e) => handleScalarChange('location', e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Website / Portfolio</label>
                                <input 
                                    type="url" 
                                    placeholder="https://johndoe.dev" 
                                    value={formData.website} 
                                    onChange={(e) => handleScalarChange('website', e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>LinkedIn Profile URL</label>
                                <input 
                                    type="url" 
                                    placeholder="linkedin.com/in/johndoe" 
                                    value={formData.linkedin} 
                                    onChange={(e) => handleScalarChange('linkedin', e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>GitHub Profile URL</label>
                                <input 
                                    type="url" 
                                    placeholder="github.com/johndoe" 
                                    value={formData.github} 
                                    onChange={(e) => handleScalarChange('github', e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Professional Summary */}
                <div className={`accordion-item ${activeSection === 'summary' ? 'active' : ''}`}>
                    <div className="accordion-trigger" onClick={() => toggleAccordion('summary')}>
                        <span className="trigger-title">
                            <FileText /> <span>Professional Summary</span>
                        </span>
                        <ChevronDown className="chevron" />
                    </div>
                    <div className="accordion-content">
                        <div className="form-group">
                            <label>Write a brief overview of your skills and career highlights</label>
                            <textarea 
                                rows="4" 
                                placeholder="Innovative Software Engineer with 5+ years of experience..." 
                                value={formData.summary} 
                                onChange={(e) => handleScalarChange('summary', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Work Experience */}
                <div className={`accordion-item ${activeSection === 'experience' ? 'active' : ''}`}>
                    <div className="accordion-trigger" onClick={() => toggleAccordion('experience')}>
                        <span className="trigger-title">
                            <Briefcase /> <span>Work Experience</span>
                        </span>
                        <ChevronDown className="chevron" />
                    </div>
                    <div className="accordion-content">
                        <div className="repeater-list">
                            {formData.experiences.map((exp, index) => (
                                <div className="repeater-item" key={exp.id}>
                                    <div className="repeater-header">
                                        <span className="repeater-index">Experience #{index + 1}</span>
                                        <button 
                                            type="button" 
                                            className="btn-remove" 
                                            onClick={() => removeExperience(exp.id)}
                                            title="Delete Entry"
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Company / Organization</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Acme Corp" 
                                                value={exp.company}
                                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Job Title / Role</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Lead Developer" 
                                                value={exp.role}
                                                onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Oct 2021" 
                                                value={exp.start}
                                                onChange={(e) => updateExperience(exp.id, 'start', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>End Date</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Present" 
                                                value={exp.end}
                                                onChange={(e) => updateExperience(exp.id, 'end', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Location</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. New York, NY" 
                                                value={exp.location}
                                                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Description / Key Achievements</label>
                                            <textarea 
                                                rows="3" 
                                                placeholder="Developed scaling services...&#10;Led team of 4 engineers..." 
                                                value={exp.desc}
                                                onChange={(e) => updateExperience(exp.id, 'desc', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="btn btn-outline" onClick={addExperience}>
                            <Plus /> <span>Add Work Experience</span>
                        </button>
                    </div>
                </div>

                {/* 4. Education */}
                <div className={`accordion-item ${activeSection === 'education' ? 'active' : ''}`}>
                    <div className="accordion-trigger" onClick={() => toggleAccordion('education')}>
                        <span className="trigger-title">
                            <GraduationCap /> <span>Education</span>
                        </span>
                        <ChevronDown className="chevron" />
                    </div>
                    <div className="accordion-content">
                        <div className="repeater-list">
                            {formData.education.map((edu, index) => (
                                <div className="repeater-item" key={edu.id}>
                                    <div className="repeater-header">
                                        <span className="repeater-index">Education #{index + 1}</span>
                                        <button 
                                            type="button" 
                                            className="btn-remove" 
                                            onClick={() => removeEducation(edu.id)}
                                            title="Delete Entry"
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>School / University</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Harvard University" 
                                                value={edu.school}
                                                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Degree / Qualification</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Bachelor of Science" 
                                                value={edu.degree}
                                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Field of Study</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Computer Science" 
                                                value={edu.field}
                                                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Location</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Cambridge, MA" 
                                                value={edu.location}
                                                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Sep 2016" 
                                                value={edu.start}
                                                onChange={(e) => updateEducation(edu.id, 'start', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>End Date</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. May 2020" 
                                                value={edu.end}
                                                onChange={(e) => updateEducation(edu.id, 'end', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Details / GPA / Achievements</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. GPA 3.92/4.00, Dean's List" 
                                                value={edu.details}
                                                onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="btn btn-outline" onClick={addEducation}>
                            <Plus /> <span>Add Education</span>
                        </button>
                    </div>
                </div>

                {/* 5. Projects */}
                <div className={`accordion-item ${activeSection === 'projects' ? 'active' : ''}`}>
                    <div className="accordion-trigger" onClick={() => toggleAccordion('projects')}>
                        <span className="trigger-title">
                            <FolderGit2 /> <span>Projects</span>
                        </span>
                        <ChevronDown className="chevron" />
                    </div>
                    <div className="accordion-content">
                        <div className="repeater-list">
                            {formData.projects.map((proj, index) => (
                                <div className="repeater-item" key={proj.id}>
                                    <div className="repeater-header">
                                        <span className="repeater-index">Project #{index + 1}</span>
                                        <button 
                                            type="button" 
                                            className="btn-remove" 
                                            onClick={() => removeProject(proj.id)}
                                            title="Delete Entry"
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Project Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Smart Wallet App" 
                                                value={proj.name}
                                                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Role / Tech Stack</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Lead Designer / Flutter, Node" 
                                                value={proj.roleTech}
                                                onChange={(e) => updateProject(proj.id, 'roleTech', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Project Link URL</label>
                                            <input 
                                                type="url" 
                                                placeholder="e.g. https://github.com/wallet" 
                                                value={proj.link}
                                                onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-span-2">
                                            <label>Description</label>
                                            <textarea 
                                                rows="3" 
                                                placeholder="Led engineering... Designed sleek modern frontend layouts..." 
                                                value={proj.desc}
                                                onChange={(e) => updateProject(proj.id, 'desc', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="btn btn-outline" onClick={addProject}>
                            <Plus /> <span>Add Project</span>
                        </button>
                    </div>
                </div>

                {/* 6. Technical Skills */}
                <div className={`accordion-item ${activeSection === 'skills' ? 'active' : ''}`}>
                    <div className="accordion-trigger" onClick={() => toggleAccordion('skills')}>
                        <span className="trigger-title">
                            <Wrench /> <span>Technical Skills</span>
                        </span>
                        <ChevronDown className="chevron" />
                    </div>
                    <div className="accordion-content">
                        <div className="repeater-list">
                            {formData.skills.map((s, index) => (
                                <div className="repeater-item" key={s.id}>
                                    <div className="repeater-header">
                                        <span className="repeater-index">Skill #{index + 1}</span>
                                        <button 
                                            type="button" 
                                            className="btn-remove" 
                                            onClick={() => removeSkill(s.id)}
                                            title="Delete Entry"
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Skill Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. JavaScript" 
                                                value={s.name}
                                                onChange={(e) => updateSkill(s.id, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Proficiency Level</label>
                                            <input 
                                                type="range" 
                                                min="10" 
                                                max="100" 
                                                step="5" 
                                                value={s.level}
                                                onChange={(e) => updateSkill(s.id, 'level', parseInt(e.target.value, 10))}
                                            />
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold', textAlign: 'right', marginTop: '0.25rem' }}>
                                                {s.level}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="btn btn-outline" onClick={addSkill}>
                            <Plus /> <span>Add Skill</span>
                        </button>
                    </div>
                </div>

                {/* 7. Languages & Certifications */}
                <div className={`accordion-item ${activeSection === 'extra' ? 'active' : ''}`}>
                    <div className="accordion-trigger" onClick={() => toggleAccordion('extra')}>
                        <span className="trigger-title">
                            <Award /> <span>Languages & Certifications</span>
                        </span>
                        <ChevronDown className="chevron" />
                    </div>
                    <div className="accordion-content">
                        <div className="form-grid">
                            <div className="form-group col-span-2">
                                <label>Certifications (One per line)</label>
                                <textarea 
                                    rows="3" 
                                    placeholder="AWS Certified Solutions Architect&#10;Certified ScrumMaster (CSM)" 
                                    value={formData.certifications} 
                                    onChange={(e) => handleScalarChange('certifications', e.target.value)}
                                />
                            </div>
                            <div className="form-group col-span-2">
                                <label>Languages (Comma separated)</label>
                                <input 
                                    type="text" 
                                    placeholder="English (Native), Spanish (Conversational)" 
                                    value={formData.languages} 
                                    onChange={(e) => handleScalarChange('languages', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 8. My Saved Resumes Dashboard */}
                <div className={`accordion-item ${activeSection === 'saved-resumes' ? 'active' : ''}`}>
                    <div className="accordion-trigger" onClick={() => toggleAccordion('saved-resumes')}>
                        <span className="trigger-title">
                            <Cloud /> <span>My Saved Resumes</span>
                        </span>
                        <span className="chevron-badge" style={{
                            fontSize: '0.7rem',
                            backgroundColor: session ? 'var(--primary-bg)' : '#f1f5f9',
                            color: session ? 'var(--primary-color)' : 'var(--text-light)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '10px',
                            fontWeight: 'bold'
                        }}>
                            {session ? savedResumes.length : 'Lock'}
                        </span>
                        <ChevronDown className="chevron" />
                    </div>
                    <div className="accordion-content">
                        {!session ? (
                            <div style={{ textAlign: 'center', padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Cloud size={32} style={{ color: 'var(--primary-light)', marginBottom: '0.5rem' }} />
                                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Cloud Saving Dashboard</h4>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', maxWidth: '280px', margin: '0 auto 0.75rem' }}>
                                    Log in to unlock your personal Cloud Dashboard! Keep all your resume drafts saved safely in the cloud and load or edit them anytime.
                                </p>
                            </div>
                        ) : (
                            <div style={{ marginTop: '0.5rem' }}>
                                {fetching ? (
                                    <div style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        <span>Fetching cloud files...</span>
                                    </div>
                                ) : savedResumes.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        <span>No saved drafts found. Click the "Save Draft" cloud button in the header to create your first save!</span>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {savedResumes.map(resume => (
                                            <div 
                                                key={resume.id}
                                                onClick={() => handleLoadResume(resume)}
                                                className={`saved-resume-card ${currentResumeId === resume.id ? 'active' : ''}`}
                                                style={{
                                                    border: `1.5px solid ${currentResumeId === resume.id ? 'var(--primary-light)' : 'var(--border-color)'}`,
                                                    borderRadius: '8px',
                                                    padding: '0.75rem 1rem',
                                                    cursor: 'pointer',
                                                    backgroundColor: '#fff',
                                                    display: 'flex',
                                                    justifyContent: 'between',
                                                    alignItems: 'center',
                                                    transition: 'all 0.2s ease',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0, flex: 1, paddingRight: '0.5rem' }}>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {resume.name}
                                                    </span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span style={{ 
                                                            fontSize: '0.6rem', 
                                                            fontWeight: 'bold', 
                                                            textTransform: 'uppercase', 
                                                            color: resume.template === 'attractive' ? 'var(--primary-color)' : '#475569',
                                                            backgroundColor: resume.template === 'attractive' ? 'var(--primary-bg)' : '#f1f5f9',
                                                            padding: '0.1rem 0.35rem',
                                                            borderRadius: '4px'
                                                        }}>
                                                            {resume.template === 'attractive' ? 'Attractive' : 'Classic Plain'}
                                                        </span>
                                                        <span style={{ fontSize: '0.65rem', color: 'var(--text-light)' }}>
                                                            {new Date(resume.updated_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                    {resume.pdf_path && (
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-get-pdf"
                                                            onClick={(e) => handleDownloadSavedPDF(e, resume.pdf_path, resume.name)}
                                                            title="Download Cloud PDF"
                                                        >
                                                            <Download size={12} />
                                                            <span>Get PDF</span>
                                                        </button>
                                                    )}
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-secondary"
                                                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', height: 'auto', borderRadius: '4px' }}
                                                        onClick={(e) => { e.stopPropagation(); handleLoadResume(resume); }}
                                                    >
                                                        Load
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        className="btn-remove"
                                                        style={{ padding: '0.35rem', height: '26px', width: '26px' }}
                                                        onClick={(e) => handleDeleteResume(e, resume.id, resume.name)}
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
