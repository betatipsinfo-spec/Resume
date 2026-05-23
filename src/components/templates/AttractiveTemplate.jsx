import React from 'react';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Globe, 
    Link, 
    Code, 
    Wrench, 
    Languages, 
    GraduationCap, 
    User, 
    Briefcase, 
    Award, 
    Info 
} from 'lucide-react';

export default function AttractiveTemplate({ data }) {
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

    // Contact items rendering helper
    const hasContactInfo = email || phone || location || website || linkedin || github;

    // Skills filter
    const validSkills = skills.filter(s => s.name.trim() !== '');

    // Education filter
    const validEdu = education.filter(e => e.school.trim() !== '' || e.degree.trim() !== '');

    // Experience filter
    const validExp = experiences.filter(exp => exp.company.trim() !== '' || exp.role.trim() !== '');

    // Projects filter
    const validProj = projects.filter(p => p.name.trim() !== '');

    // Certifications list
    const certsList = certifications && certifications.trim() 
        ? certifications.split('\n').map(c => c.trim()).filter(c => c)
        : [];

    // Languages list
    const langsList = languages && languages.trim()
        ? languages.split(',').map(l => l.trim()).filter(l => l)
        : [];

    return (
        <div className="template-attractive">
            {/* Header */}
            <div className="resume-header">
                <div className="header-left">
                    <h1>{fullname || 'Your Name'}</h1>
                    <div className="title-badge">{title || 'Professional Role Title'}</div>
                </div>
            </div>

            {/* Split body layout */}
            <div className="resume-body">
                {/* Left Sidebar column */}
                <aside className="resume-aside">
                    {/* Contacts block */}
                    {hasContactInfo && (
                        <div>
                            <div className="resume-sec-title">
                                <Info size={14} />
                                <span>Contact</span>
                            </div>
                            <div className="contact-list">
                                {email && (
                                    <div className="contact-item">
                                        <Mail size={14} />
                                        <span>{email}</span>
                                    </div>
                                )}
                                {phone && (
                                    <div className="contact-item">
                                        <Phone size={14} />
                                        <span>{phone}</span>
                                    </div>
                                )}
                                {location && (
                                    <div className="contact-item">
                                        <MapPin size={14} />
                                        <span>{location}</span>
                                    </div>
                                )}
                                {website && (
                                    <div className="contact-item">
                                        <Globe size={14} />
                                        <a href={website} target="_blank" rel="noopener noreferrer" className="project-link">
                                            {website.replace(/^https?:\/\//, '')}
                                        </a>
                                    </div>
                                )}
                                {linkedin && (
                                    <div className="contact-item">
                                        <Link size={14} />
                                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="project-link">
                                            {linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                                        </a>
                                    </div>
                                )}
                                {github && (
                                    <div className="contact-item">
                                        <Code size={14} />
                                        <a href={github} target="_blank" rel="noopener noreferrer" className="project-link">
                                            {github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Technical Skills */}
                    {validSkills.length > 0 && (
                        <div style={{ marginTop: '1.25rem' }}>
                            <div className="resume-sec-title">
                                <Wrench size={14} />
                                <span>Skills</span>
                            </div>
                            <div className="skills-container">
                                {validSkills.map((s, idx) => (
                                    <div className="skill-row" key={s.id || idx}>
                                        <div className="skill-label">
                                            <span>{s.name}</span>
                                            <span>{s.level}%</span>
                                        </div>
                                        <div className="skill-bar-outer">
                                            <div className="skill-bar-inner" style={{ width: `${s.level}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {langsList.length > 0 && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <div className="resume-sec-title">
                                <Languages size={14} />
                                <span>Languages</span>
                            </div>
                            <div className="languages-tag-container">
                                {langsList.map((lang, idx) => (
                                    <span className="language-tag" key={idx}>{lang}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {validEdu.length > 0 && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <div className="resume-sec-title">
                                <GraduationCap size={14} />
                                <span>Education</span>
                            </div>
                            <div className="experience-timeline">
                                {validEdu.map((edu, idx) => (
                                    <div className="timeline-item" key={edu.id || idx}>
                                        <div className="item-header">
                                            <div className="item-role">{edu.degree || ''} {edu.field ? `in ${edu.field}` : ''}</div>
                                            <div className="item-date">{edu.start || ''} - {edu.end || ''}</div>
                                        </div>
                                        <div className="item-company-loc">{edu.school || ''}{edu.location ? `, ${edu.location}` : ''}</div>
                                        {edu.details && <div className="item-description">{edu.details}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                {/* Right Main column */}
                <main className="resume-main">
                    {/* Summary */}
                    {summary && summary.trim() && (
                        <div>
                            <div className="resume-sec-title">
                                <User size={14} />
                                <span>Profile</span>
                            </div>
                            <div className="summary-text">{summary}</div>
                        </div>
                    )}

                    {/* Work Experience */}
                    {validExp.length > 0 && (
                        <div>
                            <div className="resume-sec-title">
                                <Briefcase size={14} />
                                <span>Experience</span>
                            </div>
                            <div className="experience-timeline">
                                {validExp.map((exp, idx) => (
                                    <div className="timeline-item" key={exp.id || idx}>
                                        <div className="item-header">
                                            <div className="item-role">{exp.role || ''}</div>
                                            <span className="item-date">{exp.start || ''} - {exp.end || ''}</span>
                                        </div>
                                        <div className="item-company-loc">{exp.company || ''}{exp.location ? `, ${exp.location}` : ''}</div>
                                        {exp.desc && <div className="item-description">{exp.desc}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {validProj.length > 0 && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <div className="resume-sec-title">
                                <Award size={14} />
                                <span>Projects</span>
                            </div>
                            <div className="project-grid">
                                {validProj.map((proj, idx) => (
                                    <div className="project-item" key={proj.id || idx}>
                                        <div className="project-title-row">
                                            <div className="project-name">{proj.name}</div>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                                    {proj.link.replace(/^https?:\/\//, '')}
                                                </a>
                                            )}
                                        </div>
                                        {proj.roleTech && <div className="project-tech">{proj.roleTech}</div>}
                                        {proj.desc && <div className="project-desc">{proj.desc}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {certsList.length > 0 && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <div className="resume-sec-title">
                                <Award size={14} />
                                <span>Certifications</span>
                            </div>
                            <div className="extra-list">
                                {certsList.map((cert, idx) => (
                                    <div className="extra-item" key={idx}>{cert}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
