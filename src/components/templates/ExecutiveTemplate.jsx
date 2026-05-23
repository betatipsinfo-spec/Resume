import React from 'react';

export default function ExecutiveTemplate({ data }) {
    const {
        fullname,
        title,
        email,
        phone,
        location,
        website,
        linkedin,
        github,
        summary,
        certifications,
        languages,
        experiences,
        education,
        projects,
        skills
    } = data;

    // Contact info bar compiler
    const contacts = [];
    if (email) contacts.push(`📧 ${email}`);
    if (phone) contacts.push(`📞 ${phone}`);
    if (location) contacts.push(`📍 ${location}`);
    if (website) contacts.push(`🌐 ${website.replace(/^https?:\/\/(www\.)?/, '')}`);
    if (linkedin) contacts.push(`💼 ${linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}`);
    if (github) contacts.push(`💻 ${github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}`);

    // Filter valid lists
    const validExp = experiences.filter(exp => exp.company.trim() !== '' || exp.role.trim() !== '');
    const validEdu = education.filter(e => e.school.trim() !== '' || e.degree.trim() !== '');
    const validProj = projects.filter(p => p.name.trim() !== '');
    const validSkills = skills.filter(s => s.name.trim() !== '');

    const certsList = certifications && certifications.trim()
        ? certifications.split('\n').map(c => c.trim()).filter(c => c)
        : [];

    const langsList = languages && languages.trim()
        ? languages.split(',').map(l => l.trim()).filter(l => l)
        : [];

    return (
        <div className="template-executive" style={{
            width: '100%',
            height: '1123px',
            backgroundColor: '#ffffff',
            color: '#1e293b',
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Bold Executive Top Header Banner (Deep Navy to Royal Blue Gradient) */}
            <div style={{
                background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', // Deep Navy / Corporate Blue
                padding: '2rem 2.5rem',
                color: '#ffffff',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                borderBottom: '4px solid #3b82f6' // Radiant Royal Blue divider line
            }}>
                <h1 style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    margin: 0,
                    letterSpacing: '-0.02em',
                    fontFamily: "Georgia, serif"
                }}>
                    {fullname || 'Your Name'}
                </h1>
                <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#93c5fd', // Soft Accent Blue
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.5rem'
                }}>
                    {title || 'Professional Title'}
                </div>
                {contacts.length > 0 && (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '0.75rem 1.25rem',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        opacity: 0.95,
                        maxWidth: '680px',
                        margin: '0 auto'
                    }}>
                        {contacts.map((contact, idx) => (
                            <span key={idx} style={{ display: 'inline-flex', alignItems: 'center' }}>{contact}</span>
                        ))}
                    </div>
                )}
            </div>

            {/* Symmetrical Two-Column Content Workspace below */}
            <div style={{
                display: 'flex',
                flex: 1,
                padding: '2rem',
                gap: '1.75rem',
                overflow: 'hidden',
                boxSizing: 'border-box'
            }}>
                {/* Left Column (65% width) - Core Timeline */}
                <div style={{
                    width: '65%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem'
                }}>
                    {/* Summary */}
                    {summary && summary.trim() && (
                        <div>
                            <h2 style={{
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                color: '#1e3a8a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                borderBottom: '2px solid #e2e8f0',
                                paddingBottom: '0.2rem',
                                marginBottom: '0.5rem',
                                fontFamily: "Georgia, serif"
                            }}>
                                Executive Summary
                            </h2>
                            <p style={{ fontSize: '0.75rem', color: '#334155', lineHeight: '1.5', margin: 0 }}>
                                {summary}
                            </p>
                        </div>
                    )}

                    {/* Professional Experience */}
                    {validExp.length > 0 && (
                        <div>
                            <h2 style={{
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                color: '#1e3a8a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                borderBottom: '2px solid #e2e8f0',
                                paddingBottom: '0.2rem',
                                marginBottom: '0.6rem',
                                fontFamily: "Georgia, serif"
                            }}>
                                Career History
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {validExp.map((exp, idx) => (
                                    <div key={exp.id || idx}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.15rem' }}>
                                            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                                {exp.role} <span style={{ fontWeight: 400, color: '#475569' }}>at</span> {exp.company}
                                            </h4>
                                            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                                                {exp.start} - {exp.end}
                                            </span>
                                        </div>
                                        {exp.location && (
                                            <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, marginBottom: '0.2rem' }}>
                                                📍 {exp.location}
                                            </div>
                                        )}
                                        {exp.desc && (
                                            <p style={{ fontSize: '0.7rem', color: '#334155', lineHeight: '1.4', margin: 0, whiteSpace: 'pre-line' }}>
                                                {exp.desc}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Key Projects */}
                    {validProj.length > 0 && (
                        <div>
                            <h2 style={{
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                color: '#1e3a8a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                borderBottom: '2px solid #e2e8f0',
                                paddingBottom: '0.2rem',
                                marginBottom: '0.6rem',
                                fontFamily: "Georgia, serif"
                            }}>
                                Notable Initiatives & Projects
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {validProj.map((p, idx) => (
                                    <div key={p.id || idx} style={{ borderBottom: '1px dashed #f1f5f9', paddingBottom: '0.4rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                                {p.name}
                                            </h4>
                                            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase' }}>
                                                {p.roleTech}
                                            </span>
                                        </div>
                                        {p.desc && (
                                            <p style={{ fontSize: '0.65rem', color: '#475569', lineHeight: '1.4', marginTop: '0.15rem', margin: 0 }}>
                                                {p.desc}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column (35% width) - Context Credentials */}
                <div style={{
                    width: '35%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    borderLeft: '1.5px solid #f1f5f9',
                    paddingLeft: '1.25rem'
                }}>
                    {/* Education */}
                    {validEdu.length > 0 && (
                        <div>
                            <h2 style={{
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                color: '#1e3a8a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                borderBottom: '2px solid #e2e8f0',
                                paddingBottom: '0.2rem',
                                marginBottom: '0.5rem',
                                fontFamily: "Georgia, serif"
                            }}>
                                Academic Credentials
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {validEdu.map((edu, idx) => (
                                    <div key={edu.id || idx}>
                                        <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                            {edu.degree}
                                        </h4>
                                        <div style={{ fontSize: '0.65rem', color: '#475569', fontWeight: 600 }}>
                                            {edu.field ? `${edu.field}` : ''}
                                        </div>
                                        <div style={{ fontSize: '0.65rem', color: '#1e3a8a', fontWeight: 700, marginTop: '0.1rem' }}>
                                            {edu.school}
                                        </div>
                                        <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                                            {edu.start} - {edu.end}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skill proficiencies */}
                    {validSkills.length > 0 && (
                        <div>
                            <h2 style={{
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                color: '#1e3a8a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                borderBottom: '2px solid #e2e8f0',
                                paddingBottom: '0.2rem',
                                marginBottom: '0.5rem',
                                fontFamily: "Georgia, serif"
                            }}>
                                Professional Skills
                            </h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                {validSkills.map((s, idx) => (
                                    <span key={s.id || idx} style={{
                                        fontSize: '0.65rem',
                                        backgroundColor: '#eff6ff',
                                        color: '#1e40af',
                                        fontWeight: 700,
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #bfdbfe'
                                    }}>
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {langsList.length > 0 && (
                        <div>
                            <h2 style={{
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                color: '#1e3a8a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                borderBottom: '2px solid #e2e8f0',
                                paddingBottom: '0.2rem',
                                marginBottom: '0.5rem',
                                fontFamily: "Georgia, serif"
                            }}>
                                Languages
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.7rem', fontWeight: 600 }}>
                                {langsList.map((lang, idx) => (
                                    <span key={idx} style={{ color: '#334155' }}>✔ {lang}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {certsList.length > 0 && (
                        <div>
                            <h2 style={{
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                color: '#1e3a8a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                borderBottom: '2px solid #e2e8f0',
                                paddingBottom: '0.2rem',
                                marginBottom: '0.5rem',
                                fontFamily: "Georgia, serif"
                            }}>
                                Certifications
                            </h2>
                            <ul style={{ paddingLeft: '0.9rem', margin: 0, fontSize: '0.65rem', lineHeight: '1.4', color: '#334155' }}>
                                {certsList.map((cert, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{cert}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
