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
    "TechCorp Labs", "InnovateTech", "DataSphere Solutions", "CloudScale", "NextGen AI"
]

locations = [
    "Remote", "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA",
    "Boston, MA", "Bengaluru, India", "Hyderabad, India", "London, UK", "Toronto, Canada",
    "Berlin, Germany", "Hybrid (San Francisco, CA)", "Hybrid (Bengaluru, India)", "Hybrid (New York, NY)"
]

stipends = [
    "$1,500 / month", "$2,000 / month", "$2,500 / month", "$3,000 / month",
    "$4,000 / month", "$5,000 / month", "₹25,000 / month", "₹35,000 / month",
    "₹50,000 / month", "₹75,000 / month"
]

durations = ["2 Months", "3 Months", "6 Months"]

eligibilities = [
    "Pursuing B.Tech / B.E. in CS, AI, Data Science or related technical field (Pre-final / Final year)",
    "Pursuing M.Tech, M.S. or Ph.D. in Computer Science, Machine Learning, or AI",
    "Open to all Bachelor's / Master's students with strong coding and analytical skills",
    "Pre-final or Final year students in Computer Science, IT, or Mathematics",
    "Recent graduates or enrolled students with demonstrated project portfolio in AI/ML"
]

def generate_description(title, company, domain, skills):
    return (
        f"Join {company} as a {title} in our {domain} team! "
        f"In this role, you will collaborate with senior engineers to design, build, and deploy cutting-edge AI and software solutions. "
        f"Key skills required include {', '.join(skills[:3])}. "
        f"You will gain hands-on experience working on real-world projects and impact millions of users."
    )

records = []
target_count = 150

# Guarantee variety across domains
domain_keys = list(domains.keys())
index = 1

while len(records) < target_count:
    domain = domain_keys[index % len(domain_keys)]
    template = random.choice(domains[domain])
    title = template[0]
    base_skills = template[1]
    
    # Pick 3 to 5 skills
    skills_sample = random.sample(base_skills, min(len(base_skills), random.randint(3, 5)))
    skills_str = ", ".join(skills_sample)
    
    company = random.choice(companies)
    location = random.choice(locations)
    stipend = random.choice(stipends)
    duration = random.choice(durations)
    eligibility = random.choice(eligibilities)
    description = generate_description(title, company, domain, skills_sample)
    
    records.append({
        "title": title,
        "company": company,
        "domain": domain,
        "required_skills": skills_str,
        "location": location,
        "stipend": stipend,
        "duration": duration,
        "eligibility": eligibility,
        "description": description
    })
    index += 1

fieldnames = ["title", "company", "domain", "required_skills", "location", "stipend", "duration", "eligibility", "description"]

csv_path = "backend/internships.csv"

with open(csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(records)

print(f"Successfully generated {len(records)} internship records in '{csv_path}'!")
