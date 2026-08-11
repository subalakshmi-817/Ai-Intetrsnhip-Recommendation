import csv
import random

domains = {
    "Artificial Intelligence": [
        ("AI Research Intern", ["Python", "PyTorch", "TensorFlow", "NLP"]),
        ("GenAI Engineer Intern", ["Python", "LangChain", "OpenAI API", "Vector DB"]),
        ("Machine Learning Engineer Intern", ["Python", "Scikit-Learn", "Pandas", "MLOps"]),
        ("Computer Vision Specialist Intern", ["Python", "OpenCV", "PyTorch", "YOLO"])
    ],
    "Data Science": [
        ("Data Science Intern", ["Python", "R", "SQL", "Pandas"]),
        ("Data Analyst Intern", ["SQL", "PowerBI", "Tableau", "Excel"]),
        ("Data Engineer Intern", ["Python", "SQL", "Apache Spark", "PostgreSQL"])
    ],
    "Software Engineering": [
        ("Full Stack Developer Intern", ["React", "Node.js", "Express", "MongoDB"]),
        ("Backend Engineer Intern", ["Python", "FastAPI", "PostgreSQL", "Docker"]),
        ("Frontend Developer Intern", ["JavaScript", "React", "TypeScript", "HTML5"]),
        ("DevOps Engineer Intern", ["Docker", "Kubernetes", "Linux", "AWS"])
    ],
    "Design & Product": [
        ("UI/UX Designer Intern", ["Figma", "Adobe XD", "Wireframing", "Prototyping"]),
        ("Product Management Intern", ["Product Strategy", "Agile", "Jira", "Analytics"])
    ]
}

companies = ["Google", "Microsoft", "Amazon", "Meta", "Apple", "NVIDIA", "Wipro", "Zoho", "Accenture", "Cognizant", "TCS", "IBM"]
locations = ["Remote", "San Francisco, CA", "Bengaluru, India", "Hyderabad, India", "Chennai, India", "London, UK"]
stipends = ["$2,000 / month", "$3,000 / month", "18000", "20000", "25000", "30000", "35000"]
durations = ["2 Months", "3 Months", "6 Months"]
eligibilities = [
    "Pursuing B.Tech / B.E. in CS, AI, Data Science or related field",
    "Open to all Bachelor's / Master's students with coding skills"
]

records = []
domain_keys = list(domains.keys())

for idx in range(1, 151):
    domain = domain_keys[idx % len(domain_keys)]
    template = random.choice(domains[domain])
    title = template[0]
    base_skills = template[1]
    
    company = random.choice(companies)
    location = random.choice(locations)
    stipend = random.choice(stipends)
    duration = random.choice(durations)
    eligibility = random.choice(eligibilities)
    skills_plain = ", ".join(base_skills)
    skills_pg_array = "{" + ",".join([f'"{s}"' for s in base_skills]) + "}"
    
    mode = "Remote" if "Remote" in location else ("Hybrid" if "Hybrid" in location else "On-site")
    
    desc = f"Join {company} as a {title} in our {domain} team. Required skills: {skills_plain}."
    
    records.append({
        "company": company,
        "company_name": company,
        "role": title,
        "title": title,
        "domain": domain,
        "skills": skills_pg_array,
        "required_skills": skills_pg_array,
        "location": location,
        "mode": mode,
        "type": mode,
        "duration": duration,
        "stipend": stipend,
        "eligibility": eligibility,
        "description": desc
    })

fieldnames = [
    "company", "company_name", "role", "title", "domain",
    "skills", "required_skills", "location", "mode", "type",
    "duration", "stipend", "eligibility", "description"
]

with open("backend/internships.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(records)

with open("internships.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(records)

print("Generated clean internships.csv successfully!")
