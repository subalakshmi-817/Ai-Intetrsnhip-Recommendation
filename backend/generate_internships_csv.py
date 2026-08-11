import csv
import random

domains = {
    "Artificial Intelligence": [
        ("AI Research Intern", ["Python", "PyTorch", "TensorFlow", "NLP", "Deep Learning"]),
        ("GenAI Engineer Intern", ["Python", "LangChain", "OpenAI API", "Vector Databases", "Prompt Engineering"]),
        ("Machine Learning Engineer Intern", ["Python", "Scikit-Learn", "Pandas", "NumPy", "MLOps"]),
        ("Computer Vision Specialist Intern", ["Python", "OpenCV", "PyTorch", "YOLO", "CNN"]),
        ("NLP Intern", ["Python", "Hugging Face", "Transformers", "BERT", "NLTK"]),
        ("AI Ethics & Governance Intern", ["Python", "AI Bias Testing", "Data Privacy", "Fairness Metrics"])
    ],
    "Data Science": [
        ("Data Science Intern", ["Python", "R", "SQL", "Pandas", "Matplotlib"]),
        ("Data Analyst Intern", ["SQL", "PowerBI", "Tableau", "Excel", "Python"]),
        ("Data Engineer Intern", ["Python", "SQL", "Apache Spark", "Airflow", "PostgreSQL"]),
        ("Business Intelligence Intern", ["SQL", "PowerBI", "DAX", "Data Modeling", "Excel"])
    ],
    "Software Engineering": [
        ("Full Stack Developer Intern", ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"]),
        ("Backend Engineer Intern", ["Python", "FastAPI", "PostgreSQL", "Docker", "REST API"]),
        ("Frontend Developer Intern", ["JavaScript", "React", "TypeScript", "HTML5", "CSS3"]),
        ("Mobile App Developer Intern", ["Flutter", "Dart", "React Native", "Firebase", "iOS/Android"]),
        ("DevOps Engineer Intern", ["Docker", "Kubernetes", "Linux", "CI/CD", "AWS"]),
        ("Cybersecurity Intern", ["Python", "Network Security", "Ethical Hacking", "Wireshark", "Linux"])
    ],
    "Design & Product": [
        ("UI/UX Designer Intern", ["Figma", "Adobe XD", "Wireframing", "User Research", "Prototyping"]),
        ("Product Management Intern", ["Product Strategy", "Agile/Scrum", "Jira", "User Stories", "Analytics"]),
        ("Technical Writer Intern", ["Documentation", "Markdown", "Git", "API Reference", "Technical Communication"])
    ]
}

companies = [
    "Google", "Microsoft", "Amazon", "Meta", "Apple", "NVIDIA", "OpenAI",
    "Adobe", "Salesforce", "IBM", "Intel", "Oracle", "Uber", "Airbnb",
    "Stripe", "Spotify", "Databricks", "Snowflake", "Palantir", "Scale AI",
    "Anthropic", "Cohere", "Hugging Face", "Mistral AI", "DeepMind",
    "Wipro", "Zoho", "Accenture", "Cognizant", "Infosys", "TCS"
]

locations = [
    "Remote", "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA",
    "Bengaluru, India", "Hyderabad, India", "Chennai, India", "London, UK", "Toronto, Canada"
]

stipends = [
    "$1,500 / month", "$2,000 / month", "$2,500 / month", "$3,000 / month",
    "$4,000 / month", "15000", "18000", "20000", "22000", "25000", "30000", "35000", "40000"
]

durations = ["2 Months", "3 Months", "6 Months"]

eligibilities = [
    "Pursuing B.Tech / B.E. in CS, AI, Data Science or related technical field",
    "Pursuing M.Tech, M.S. or Ph.D. in Computer Science, Machine Learning, or AI",
    "Open to all Bachelor's / Master's students with strong coding skills",
    "Pre-final or Final year students in Computer Science, IT, or Mathematics"
]

def generate_description(title, company, domain, skills):
    return (
        f"Join {company} as a {title} in our {domain} team! "
        f"In this role, you will collaborate with senior engineers to design, build, and deploy cutting-edge AI and software solutions. "
        f"Key skills required include {', '.join(skills[:3])}."
    )

records = []
target_count = 150
domain_keys = list(domains.keys())

for idx in range(1, target_count + 1):
    domain = domain_keys[idx % len(domain_keys)]
    template = random.choice(domains[domain])
    title = template[0]
    base_skills = template[1]
    
    skills_sample = random.sample(base_skills, min(len(base_skills), random.randint(3, 5)))
    skills_str = ", ".join(skills_sample)
    
    company = random.choice(companies)
    location = random.choice(locations)
    stipend = random.choice(stipends)
    duration = random.choice(durations)
    eligibility = random.choice(eligibilities)
    description = generate_description(title, company, domain, skills_sample)
    
    if "Remote" in location:
        mode = "Remote"
    elif "Hybrid" in location:
        mode = "Hybrid"
    else:
        mode = "On-site"
        
    records.append({
        "company": company,
        "company_name": company,
        "role": title,
        "title": title,
        "domain": domain,
        "skills": skills_str,
        "required_skills": skills_str,
        "location": location,
        "mode": mode,
        "type": mode,
        "duration": duration,
        "stipend": stipend,
        "eligibility": eligibility,
        "description": description
    })

fieldnames = [
    "company", "company_name", "role", "title", "domain",
    "skills", "required_skills", "location", "mode", "type",
    "duration", "stipend", "eligibility", "description"
]

csv_path = "backend/internships.csv"

with open(csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(records)

# Also copy to root
with open("internships.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(records)

print(f"Successfully generated {len(records)} internship records with complete dual headers in '{csv_path}' and 'internships.csv'!")
