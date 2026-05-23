export const initialEmptyData = {
    fullname: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    certifications: '',
    languages: '',
    experiences: [{ id: 'exp-initial', company: '', role: '', start: '', end: '', location: '', desc: '' }],
    education: [{ id: 'edu-initial', school: '', degree: '', field: '', location: '', start: '', end: '', details: '' }],
    projects: [{ id: 'proj-initial', name: '', roleTech: '', link: '', desc: '' }],
    skills: [{ id: 'skill-initial', name: '', level: 80 }]
};

export const sampleProfileData = {
    fullname: "Alexander Wright",
    title: "Lead Full-Stack Architect",
    email: "alexander.wright@techlabs.io",
    phone: "+1 (555) 782-9012",
    location: "Austin, TX",
    website: "https://wrightcodes.dev",
    linkedin: "https://linkedin.com/in/alexander-wright",
    github: "https://github.com/alexwright",
    summary: "Innovative and results-driven Software Architect with 8+ years of hands-on experience designing, building, and deploying highly scalable web architectures and cloud-native systems. Proven track record of leading dynamic engineering teams, reducing infrastructure expenditure by 35%, and maintaining 99.99% system availability.",
    certifications: "AWS Certified Solutions Architect – Professional (2025)\nCertified Scrum Professional (CSP-SM)",
    languages: "English (Native), German (Professional Working)",
    experiences: [
        {
            id: 'exp-1',
            company: "CloudVibe Systems",
            role: "Senior Full-Stack Architect",
            start: "Jan 2023",
            end: "Present",
            location: "Austin, TX",
            desc: "• Architected high-throughput microservices using Node.js and AWS Lambda, increasing system processing capacity by 150%.\n• Pioneered database optimization and migration to fully serverless DynamoDB setups, saving $80,000 annually.\n• Mentored 8 junior and mid-level developers, establishing robust code review protocols and clean architecture patterns."
        },
        {
            id: 'exp-2',
            company: "Apex Fintech Group",
            role: "Software Engineer II",
            start: "Jun 2020",
            end: "Dec 2022",
            location: "Chicago, IL",
            desc: "• Designed real-time transaction processing dashboards using React.js and WebSockets, rendering query lists under 12ms.\n• Implemented secure JWT-based authorization mechanisms and OAuth2 integrations, minimizing access vulnerabilities by 35%.\n• Coordinated with QA to roll out automated end-to-end regression tests using Cypress, cutting release cycles by 4 days."
        }
    ],
    education: [
        {
            id: 'edu-1',
            school: "University of Texas at Austin",
            degree: "Master of Science",
            field: "Computer Science",
            location: "Austin, TX",
            start: "Sep 2018",
            end: "May 2020",
            details: "Specialization in Distributed Systems & Security. GPA: 3.92/4.00."
        },
        {
            id: 'edu-2',
            school: "Illinois Institute of Technology",
            degree: "Bachelor of Science",
            field: "Software Engineering",
            location: "Chicago, IL",
            start: "Sep 2014",
            end: "May 2018",
            details: "Graduated Magna Cum Laude. President's Scholar Award recipient."
        }
    ],
    projects: [
        {
            id: 'proj-1',
            name: "ResuForge PDF Engine",
            roleTech: "Lead Developer | Node.js, html2pdf, Javascript",
            link: "https://github.com/alexwright/resuforge",
            desc: "• Engineered a web-based, real-time client-side resume designer providing instant pixel-perfect PDF rendering.\n• Scaled UI response to load templates in less than 8ms through highly efficient vanilla DOM injection models."
        },
        {
            id: 'proj-2',
            name: "Distributed Caching Engine",
            roleTech: "Creator | Go, Redis, gRPC Protocols",
            link: "https://github.com/alexwright/grpc-cache",
            desc: "• Engineered a custom multi-node in-memory cache supporting ultra-low latency client fetches.\n• Achieved benchmark throughput of 45,000 read operations/sec under heavily simulated server stress."
        }
    ],
    skills: [
        { id: 'skill-1', name: "JavaScript / TypeScript", level: 95 },
        { id: 'skill-2', name: "React / Next.js Frameworks", level: 90 },
        { id: 'skill-3', name: "Node.js & Go Server-Side", level: 85 },
        { id: 'skill-4', name: "AWS Cloud Operations", level: 80 },
        { id: 'skill-5', name: "System Design & Caching", level: 85 }
    ]
};
