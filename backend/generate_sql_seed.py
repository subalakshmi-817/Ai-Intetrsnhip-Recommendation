import csv

csv_path = "backend/internships.csv"
sql_path = "backend/seed_internships.sql"

with open(csv_path, mode="r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open(sql_path, mode="w", encoding="utf-8") as f:
    f.write("-- Seed Data: 150 Internships for Supabase\n\n")
    f.write("INSERT INTO public.internships (title, role, company, company_name, domain, skills, required_skills, location, mode, type, stipend, duration, eligibility, description, status)\nVALUES\n")
    
    values_list = []
    for row in rows:
        title = row["title"].replace("'", "''")
        role = row["role"].replace("'", "''")
        company = row["company"].replace("'", "''")
        company_name = row["company_name"].replace("'", "''")
        domain = row["domain"].replace("'", "''")
        
        # Skills array string
        skills_items = []
        for s in row["skills"].split(","):
            cleaned = s.strip().replace("'", "''")
            if cleaned:
                skills_items.append(f"'{cleaned}'")
        skills_pg = f"ARRAY[{', '.join(skills_items)}]"
        
        location = row["location"].replace("'", "''")
        mode = row["mode"].replace("'", "''")
        stipend = row["stipend"].replace("'", "''")
        duration = row["duration"].replace("'", "''")
        eligibility = row["eligibility"].replace("'", "''")
        description = row["description"].replace("'", "''")
        
        val = f"  ('{title}', '{role}', '{company}', '{company_name}', '{domain}', {skills_pg}, {skills_pg}, '{location}', '{mode}', '{mode}', '{stipend}', '{duration}', '{eligibility}', '{description}', 'open')"
        values_list.append(val)
    
    f.write(",\n".join(values_list))
    f.write(";\n")

print(f"Generated updated SQL seed file at '{sql_path}' with {len(rows)} records.")
