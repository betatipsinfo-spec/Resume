import React from 'react';

export default function MinimalistTemplate({ data }) {
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

    // Contact info parser
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
        <div className="template-minimalist" style={{
            display: 'flex',
            width: '100%',
            height: '1123px',
            backgroundColor: '#ffffff',
            color: '#334155',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            overflow: 'hidden'
        }}>
            {/* Left Accent Sidebar (30%) */}
            <div className="minimalist-sidebar" style={{
                width: '30%',
                backgroundColor: '#f8fafc',
                borderRight: '1px solid #e2e8f0',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.75rem',
                height: '100%'
            }}>
                {/* Header Info in Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <h1 style={{
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        lineHeight: '1.2',
                        letterSpacing: '-0.02em',
                        margin: 0
                    }}>
                        {fullname || 'Your Name'}
                    </h1>
                    <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#3b82f6',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {title || 'Professional Title'}
                    </div>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        color: '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        borderBottom: '1.5px solid #cbd5e1',
                        paddingBottom: '0.25rem',
                        marginBottom: '0.75rem'
                    }}>
                        Contact Info
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.7rem', wordBreak: 'break-word' }}>
                        {email && (
                            <div>
                                <span style={{ fontWeight: 700, color: '#0f172a', display: 'block', fontSize: '0.6rem', textTransform: 'uppercase' }}>Email</span>
                                <span>{email}</span>
                            </div>
                        )}
                        {phone && (
                            <div>
                                <span style={{ fontWeight: 700, color: '#0f172a', display: 'block', fontSize: '0.6rem', textTransform: 'uppercase' }}>Phone</span>
                                <span>{phone}</span>
                            </div>
                        )}
                        {location && (
                            <div>
                                <span style={{ fontWeight: 700, color: '#0f172a', display: 'block', fontSize: '0.6rem', textTransform: 'uppercase' }}>Location</span>
                                <span>{location}</span>
                            </div>
                        )}
                        {website && (
                            <div>
                                <span style={{ fontWeight: 700, color: '#0f172a', display: 'block', fontSize: '0.6rem', textTransform: 'uppercase' }}>Website</span>
                                <a href={website} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                                    {website.replace(/^https?:\/\/(www\.)?/, '')}
                                </a>
                            </div>
                        )}
                        {linkedin && (
                            <div>
                                <span style={{ fontWeight: 700, color: '#0f172a', display: 'block', fontSize: '0.6rem', textTransform: 'uppercase' }}>LinkedIn</span>
                                <a href={linkedin} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                                    {linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                                </a>
                            </div>
                        )}
                        {github && (
                            <div>
                                <span style={{ fontWeight: 700, color: '#0f172a', display: 'block', fontSize: '0.6rem', textTransform: 'uppercase' }}>GitHub</span>
                                <a href={github} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                                    {github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Technical Skills with Level Progress Indicators */}
                {validSkills.length > 0 && (
                    <div>
                        <h3 style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            color: '#475569',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            borderBottom: '1.5px solid #cbd5e1',
                            paddingBottom: '0.25rem',
                            marginBottom: '0.75rem'
                        }}>
                            Expertise
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {validSkills.map((s, idx) => (
                                <div key={s.id || idx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.15rem' }}>
                                        <span>{s.name}</span>
                                        <span style={{ color: '#64748b', fontSize: '0.65rem' }}>{s.level}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ width: `${s.level}%`, height: '100%', backgroundColor: '#3b82f6', borderRadius: '2px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {langsList.length > 0 && (
                    <div>
                        <h3 style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            color: '#475569',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            borderBottom: '1.5px solid #cbd5e1',
                            paddingBottom: '0.25rem',
                            marginBottom: '0.75rem'
                        }}>
                            Languages
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.7rem' }}>
                            {langsList.map((lang, idx) => (
                                <div key={idx} style={{ fontWeight: 600, color: '#1e293b' }}>
                                    • {lang}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Main Column (70%) */}
            <div className="minimalist-main" style={{
                width: '70%',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                height: '100%',
                overflow: 'hidden'
            }}>
                {/* Professional Summary */}
                {summary && summary.trim() && (
                    <div>
                        <h2 style={{
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            borderBottom: '1.5px solid #3b82f6',
                            paddingBottom: '0.25rem',
                            marginBottom: '0.5rem',
                            display: 'inline-block'
                        }}>
                            Profile Summary
                        </h2>
                        <p style={{
                            fontSize: '0.75rem',
                            color: '#475569',
                            lineHeight: '1.5',
                            margin: 0
                        }}>
                            {summary}
                        </p>
                    </div>
                )}

                {/* Work Experience */}
                {validExp.length > 0 && (
                    <div>
                        <h2 style={{
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            borderBottom: '1.5px solid #3b82f6',
                            paddingBottom: '0.25rem',
                            marginBottom: '0.75rem',
                            display: 'inline-block'
                        }}>
                            Work Experience
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {validExp.map((exp, idx) => (
                                <div key={exp.id || idx} style={{ position: 'relative', paddingLeft: '0.75rem', borderLeft: '1.5px solid #e2e8f0' }}>
                                    {/* Small circle indicator */}
                                    <div style={{
                                        position: 'absolute',
                                        left: '-4.5px',
                                        top: '4px',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: '#3b82f6',
                                        border: '1.5px solid #ffffff'
                                    }} />
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.15rem' }}>
                                        <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                            {exp.role} <span style={{ fontWeight: 400, color: '#64748b' }}>at</span> {exp.company}
                                        </h4>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                                            {exp.start} - {exp.end}
                                        </span>
                                    </div>
                                    {exp.location && (
                                        <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, marginBottom: '0.25rem' }}>
                                            {exp.location}
                                        </div>
                                    )}
                                    {exp.desc && (
                                        <p style={{ fontSize: '0.7rem', color: '#475569', lineHeight: '1.4', margin: 0, whiteSpace: 'pre-line' }}>
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
                            color: '#0f172a',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            borderBottom: '1.5px solid #3b82f6',
                            paddingBottom: '0.25rem',
                            marginBottom: '0.75rem',
                            display: 'inline-block'
                        }}>
                            Key Projects
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            {validProj.map((p, idx) => (
                                <div key={p.id || idx} style={{
                                    border: '1px solid #f1f5f9',
                                    borderRadius: '6px',
                                    padding: '0.6rem 0.75rem',
                                    backgroundColor: '#f8fafc'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.15rem' }}>
                                        <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                            {p.name}
                                        </h4>
                                    </div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                        {p.roleTech || 'Contributor'}
                                    </div>
                                    {p.link && (
                                        <a href={p.link} target="_blank" rel="noreferrer" style={{
                                            fontSize: '0.65rem',
                                            color: '#64748b',
                                            textDecoration: 'none',
                                            display: 'block',
                                            marginBottom: '0.25rem',
                                            fontWeight: 600
                                        }}>
                                            🔗 {p.link.replace(/^https?:\/\/(www\.)?/, '')}
                                        </a>
                                    )}
                                    {p.desc && (
                                        <p style={{ fontSize: '0.65rem', color: '#475569', lineHeight: '1.4', margin: 0 }}>
                                            {p.desc}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {validEdu.length > 0 && (
                    <div>
                        <h2 style={{
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            borderBottom: '1.5px solid #3b82f6',
                            paddingBottom: '0.25rem',
                            marginBottom: '0.75rem',
                            display: 'inline-block'
                        }}>
                            Education
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {validEdu.map((edu, idx) => (
                                <div key={edu.id || idx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.15rem' }}>
                                        <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                            {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                                        </h4>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>
                                            {edu.start} - {edu.end}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: '#3b82f6', fontWeight: 700 }}>
                                        {edu.school} {edu.location ? `| ${edu.location}` : ''}
                                    </div>
                                    {edu.details && (
                                        <p style={{ fontSize: '0.65rem', color: '#475569', marginTop: '0.15rem', margin: 0 }}>
                                            {edu.details}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications (Single Column list under main) */}
                {certsList.length > 0 && (
                    <div>
                        <h2 style={{
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            color: '#0f172a',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            borderBottom: '1.5px solid #3b82f6',
                            paddingBottom: '0.25rem',
                            marginBottom: '0.5rem',
                            display: 'inline-block'
                        }}>
                            Certifications
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem', fontSize: '0.7rem', fontWeight: 600, color: '#1e293b' }}>
                            {certsList.map((cert, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <span style={{ color: '#3b82f6' }}>✔</span> {cert}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
