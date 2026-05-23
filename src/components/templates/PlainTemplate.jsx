import React from 'react';

export default function PlainTemplate({ data }) {
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
    if (email) contacts.push(email);
    if (phone) contacts.push(phone);
    if (location) contacts.push(location);
    if (website) contacts.push(website.replace(/^https?:\/\//, ''));
    if (linkedin) contacts.push(linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, ''));
    if (github) contacts.push(github.replace(/^https?:\/\/(www\.)?github\//, ''));

    // Filter valid lists
    const validExp = experiences.filter(exp => exp.company.trim() !== '' || exp.role.trim() !== '');
    const validEdu = education.filter(e => e.school.trim() !== '' || e.degree.trim() !== '');
    const validProj = projects.filter(p => p.name.trim() !== '');
    const validSkills = skills.filter(s => s.name.trim() !== '').map(s => s.name);

    // Certifications list
    const certsList = certifications && certifications.trim()
        ? certifications.split('\n').map(c => c.trim()).filter(c => c)
        : [];

    return (
        <div className="template-plain">
            {/* Centered Minimalist Header */}
            <div className="resume-header">
                <h1>{fullname || 'Your Name'}</h1>
                <div className="title-badge">{title || 'Professional Title'}</div>
                {contacts.length > 0 && (
                    <div className="contact-bar">
                        {contacts.map((contact, idx) => (
                            <React.Fragment key={idx}>
                                <span>{contact}</span>
                                {idx < contacts.length - 1 && <span className="contact-divider">|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>

            {/* Resume content blocks */}
            <div className="resume-body">
                {/* Summary */}
                {summary && summary.trim() && (
                    <div>
                        <div className="resume-sec-title">Professional Summary</div>
                        <div className="summary-text">{summary}</div>
                    </div>
                )}

                {/* Experience */}
                {validExp.length > 0 && (
                    <div>
                        <div className="resume-sec-title">Professional Experience</div>
                        <div className="experience-list">
                            {validExp.map((exp, idx) => (
                                <div className="plain-item" key={exp.id || idx}>
                                    <div className="item-meta-row">
                                        <div className="item-title-org">
                                            {exp.role || ''} {exp.company ? <span>— {exp.company}</span> : ''}
                                        </div>
                                        <div className="item-date-loc">
                                            {exp.start || ''} - {exp.end || ''}{exp.location ? ` | ${exp.location}` : ''}
                                        </div>
                                    </div>
                                    {exp.desc && <div className="item-description">{exp.desc}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {validProj.length > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                        <div className="resume-sec-title">Key Projects</div>
                        <div className="plain-projects-grid">
                            {validProj.map((p, idx) => (
                                <div className="plain-project-item" key={p.id || idx}>
                                    <div className="project-header">
                                        <div className="project-title-tech">
                                            {p.name} {p.roleTech ? <span>({p.roleTech})</span> : ''}
                                        </div>
                                        {p.link && (
                                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link-label">
                                                {p.link.replace(/^https?:\/\//, '')}
                                            </a>
                                        )}
                                    </div>
                                    {p.desc && <div className="project-description">{p.desc}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {validEdu.length > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                        <div className="resume-sec-title">Education</div>
                        <div className="experience-list">
                            {validEdu.map((edu, idx) => (
                                <div className="plain-item" key={edu.id || idx}>
                                    <div className="item-meta-row">
                                        <div className="item-title-org">
                                            {edu.degree || ''} {edu.field ? `in ${edu.field}` : ''} {edu.school ? <span>— {edu.school}</span> : ''}
                                        </div>
                                        <div className="item-date-loc">
                                            {edu.start || ''} - {edu.end || ''}{edu.location ? ` | ${edu.location}` : ''}
                                        </div>
                                    </div>
                                    {edu.details && <div className="item-description">{edu.details}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Technical Skills */}
                {validSkills.length > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                        <div className="resume-sec-title">Technical Skills</div>
                        <div className="skills-text-list">
                            {validSkills.join(', ')}
                        </div>
                    </div>
                )}

                {/* Extra Details */}
                {(langsList().length > 0 || certsList.length > 0) && (
                    <div style={{ marginTop: '0.5rem' }}>
                        <div className="resume-sec-title">Languages & Certifications</div>
                        {langsList().length > 0 && (
                            <div className="plain-extra-row">
                                <strong>Languages:</strong> {languages}
                            </div>
                        )}
                        {certsList.length > 0 && (
                            <div className="plain-extra-row">
                                <strong>Certifications:</strong> {certsList.join(', ')}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    // Dynamic helper for languages
    function langsList() {
        return languages && languages.trim()
            ? languages.split(',').map(l => l.trim()).filter(l => l)
            : [];
    }
}
