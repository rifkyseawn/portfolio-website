import { StructuredContent } from "./types";

// Update the generateStructuredResponse function to handle specific project types
export function generateStructuredResponse(queryType: string): StructuredContent | null {
    // Define individual project templates
    const projectTemplates: Record<string, { title: string; description: string; technologies: string[]; link: string }[]> = {
        image_classification_project: [
            {
                title: "Image Classification Website",
                description:
                    "Computer vision model deployed with an intuitive web layer so non-technical teams can classify images easily.",
                technologies: ["TensorFlow", "Python", "Flask", "Computer Vision"],
                link: "https://github.com/rifkyseawn/image-classification",
            },
        ],
        sentiment_analysis_project: [
            {
                title: "Public Sentiment Analysis",
                description:
                    "End-to-end pipeline on tuition fee increase discussions: scraping, cleaning, sentiment modeling, and reporting.",
                technologies: ["Python", "NLP", "Sentiment Analysis", "ETL"],
                link: "https://drive.google.com/file/d/1MUPJh2KcA7rjHH2Y7umKUtOx-IM4F_LR/view",
            },
        ],
        queue_prediction_project: [
            {
                title: "Queue Time Prediction",
                description:
                    "Gradient boosting model that forecasts healthcare wait times to improve patient flow and staffing decisions.",
                technologies: ["Python", "Gradient Boosting", "Healthcare Analytics"],
                link: "https://drive.google.com/file/d/1vZWNW8R1qihkyjWXMFkOn4iqye_OPEYb/view",
            },
        ],
    };

    // Define individual contact templates
    const contactTemplates: Record<string, { email?: string; phone?: string; location?: string; discord?: string; type: string }> = {
        email_contact: {
            email: "rifkysetiawan@mail.ugm.ac.id",
            type: "Email",
        },
        phone_contact: {
            phone: "",
            type: "Phone",
        },
        location_contact: {
            location: "Yogyakarta, Indonesia",
            type: "Location",
        },
        discord_contact: {
            discord: "https://www.instagram.com/riffkyys/",
            type: "Instagram",
        },
    };

    // Define individual link templates
    const linkTemplates: Record<string, { title: string; url: string; description: string }[]> = {
        resume_link: [
            {
                title: "Resume",
                url: "https://github.com/rifkyseawn/rifkysstore.github.io",
                description:
                    "View my resume and portfolio materials (placeholder link)",
            },
        ],
        github_link: [
            {
                title: "GitHub Profile",
                url: "https://github.com/rifkyseawn",
                description:
                    "Check out my code repositories and open-source contributions",
            },
        ],
        linkedin_link: [
            {
                title: "LinkedIn Profile",
                url: "https://www.linkedin.com/in/setiawanrifky/",
                description: "Connect with me professionally on LinkedIn",
            },
        ],
        discord_link: [
            {
                title: "Instagram",
                url: "https://www.instagram.com/riffkyys/",
                description: "Say hi on Instagram",
            },
        ],
        portfolio_link: [
            {
                title: "Portfolio Website",
                url: "https://rifkyseawn.github.io/rifkysstore.github.io/",
                description: "My personal portfolio showcasing projects and skills",
            },
        ],
        project_links: [
            {
                title: "Image Classification Website",
                url: "https://github.com/rifkyseawn/image-classification",
                description: "Vision model with an intuitive web UI",
            },
            {
                title: "Public Sentiment Analysis",
                url: "https://drive.google.com/file/d/1MUPJh2KcA7rjHH2Y7umKUtOx-IM4F_LR/view",
                description: "Sentiment pipeline on tuition fee discussions",
            },
            {
                title: "Queue Time Prediction",
                url: "https://drive.google.com/file/d/1vZWNW8R1qihkyjWXMFkOn4iqye_OPEYb/view",
                description: "Queue prediction for healthcare",
            },
        ],
    };

    // Define the structured data templates for general categories
    const structuredDataTemplates: Record<string, unknown> = {
        skills: [
            { name: "Python", category: "Programming Language" },
            { name: "SQL", category: "Programming Language" },
            { name: "Java", category: "Programming Language" },
            { name: "JavaScript", category: "Programming Language" },
            { name: "C", category: "Programming Language" },
            { name: "PHP", category: "Programming Language" },
            { name: "TensorFlow", category: "Machine Learning" },
            { name: "spaCy", category: "Machine Learning" },
            { name: "Flask", category: "Framework" },
            { name: "Django", category: "Framework" },
            { name: "Next.js", category: "Framework" },
            { name: "Laravel", category: "Framework" },
            { name: "PowerBI", category: "Tooling" },
            { name: "Docker", category: "DevOps" },
            { name: "AWS", category: "Cloud" },
            { name: "Hadoop", category: "Data" },
            { name: "Git", category: "Version Control" },
            { name: "Generative AI", category: "Focus" },
            { name: "LLM Prompting", category: "Focus" },
            { name: "MLOps", category: "Focus" },
            { name: "API Design", category: "Focus" },
            { name: "Stakeholder Management", category: "Focus" },
        ],
        projects: [
            {
                title: "Image Classification Website",
                description:
                    "Vision model deployed with an intuitive web layer for non-technical teams.",
                technologies: ["TensorFlow", "Python", "Flask", "Computer Vision"],
                link: "https://github.com/rifkyseawn/image-classification",
            },
            {
                title: "Public Sentiment Analysis",
                description:
                    "Scraping, cleaning, sentiment modeling, and reporting for tuition fee policy monitoring.",
                technologies: ["Python", "NLP", "Sentiment Analysis", "Data Pipeline"],
                link: "https://drive.google.com/file/d/1MUPJh2KcA7rjHH2Y7umKUtOx-IM4F_LR/view",
            },
            {
                title: "Queue Time Prediction",
                description:
                    "Gradient boosting model predicting healthcare wait times to optimize flow.",
                technologies: ["Python", "Gradient Boosting", "Analytics"],
                link: "https://drive.google.com/file/d/1vZWNW8R1qihkyjWXMFkOn4iqye_OPEYb/view",
            },
        ],
        experience: [
            {
                title: "Data Analyst Intern",
                company: "Pertamina Patra Niaga",
                period: "Internship",
                description: "Supported data analysis and reporting for business stakeholders.",
            },
            {
                title: "Data Science Class Manager",
                company: "Intelligo ID",
                period: "Part-time",
                description: "Led coursework and managed delivery for data science classes.",
            },
            {
                title: "Junior Data Scientist",
                company: "Vinix7",
                period: "Junior",
                description: "Built ML solutions and contributed to production readiness.",
            },
        ],
        education: [
            {
                title: "Bachelor of Computer Science",
                institution: "Universitas Gadjah Mada",
                period: "2023 - 2027",
                description: "Undergraduate program focusing on computer science and AI.",
            },
        ],
        contact: {
            email: "rifkysetiawan@mail.ugm.ac.id",
            phone: "",
            location: "Yogyakarta, Indonesia",
            linkedin: "https://www.linkedin.com/in/setiawanrifky/",
            github: "https://github.com/rifkyseawn",
            discord: "https://www.instagram.com/riffkyys/",
            portfolio: "https://rifkyseawn.github.io/rifkysstore.github.io/",
        },
        awards: [
            {
                title: "1st Runner Up, Contest of Wits – Festival Karakter 2023",
                description: "Universitas Gadjah Mada competition recognition.",
            },
            {
                title: "7th Place, Data Science – GBBSD 2023",
                description: "Gerakan Belajar Bersama Sains Data 2023, UPN Veteran Jawa Timur.",
            },
            {
                title: "Top 10 Finalist, Data Mining – PMNB TIK 2024",
                description: "Pagelaran Mahasiswa Nasional Bidang TIK 2024, Universitas Gadjah Mada.",
            },
        ],
        links: [
            {
                title: "Portfolio Website",
                url: "https://rifkyseawn.github.io/rifkysstore.github.io/",
                description: "My personal portfolio showcasing projects and skills",
            },
            {
                title: "Resume",
                url: "https://github.com/rifkyseawn/rifkysstore.github.io",
                description: "View my detailed resume (placeholder link)",
            },
            {
                title: "GitHub Profile",
                url: "https://github.com/rifkyseawn",
                description: "Check out my code repositories and contributions",
            },
            {
                title: "LinkedIn",
                url: "https://www.linkedin.com/in/setiawanrifky/",
                description: "Connect with me professionally",
            },
            {
                title: "Image Classification Website",
                url: "https://github.com/rifkyseawn/image-classification",
                description: "Vision model with intuitive UI",
            },
            {
                title: "Public Sentiment Analysis",
                url: "https://drive.google.com/file/d/1MUPJh2KcA7rjHH2Y7umKUtOx-IM4F_LR/view",
                description: "Sentiment pipeline for tuition fee discussions",
            },
            {
                title: "Queue Time Prediction",
                url: "https://drive.google.com/file/d/1vZWNW8R1qihkyjWXMFkOn4iqye_OPEYb/view",
                description: "Queue forecasting for healthcare",
            },
        ],
    };

    // Check if it's a specific project type
    if (queryType.includes("_project")) {
        return {
            type: "projects",
            data: projectTemplates[queryType],
        };
    }

    // Check if it's a specific contact type
    if (queryType.includes("_contact")) {
        return {
            type: "contact",
            data: contactTemplates[queryType],
        };
    }

    // Check if it's a specific link type
    if (queryType.includes("_link")) {
        return {
            type: "links",
            data: linkTemplates[queryType],
        };
    }

    // Otherwise return the general category data
    if (structuredDataTemplates[queryType]) {
        return {
            type: queryType,
            data: structuredDataTemplates[queryType],
        };
    }

    return null;
}
