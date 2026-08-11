import csv

csv_path = "backend/internships.csv"
sql_path = "backend/seed_internships.sql"

with open(csv_path, mode="r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open(sql_path, mode="w", encoding="utf-8") as f:
    f.write("-- Seed Data: 150 Internships for Supabase\n\n")
    f.write("INSERT INTO public.internships (title, company_name, domain, required_skills, location, type, stipend, duration, eligibility, description, status)\nVALUES\n")
    
    values_list = []
    for row in rows:
        title = row["title"].replace("'", "''")
        company = row["company"].replace("'", "''")
        domain = row["domain"].replace("'", "''")
        
        # Format skills for PostgreSQL array string
        skills_items = []
        for s in row["required_skills"].split(","):
            cleaned = s.strip().replace("'", "''")
            if cleaned:
                skills_items.append(f"'{cleaned}'")
        skills_pg = f"ARRAY[{', '.join(skills_items)}]"
        
        location = row["location"].replace("'", "''")
        if "Remote" in location:
            itype = "Remote"
        elif "Hybrid" in location:
            itype = "Hybrid"
        else:
            itype = "On-site"
            
        stipend = row["stipend"].replace("'", "''")
        duration = row["duration"].replace("'", "''")
        eligibility = row["eligibility"].replace("'", "''")
        description = row["description"].replace("'", "''")
        
        val = f"  ('{title}', '{company}', '{domain}', {skills_pg}, '{location}', '{itype}', '{stipend}', '{duration}', '{eligibility}', '{description}', 'open')"
        values_list.append(val)
    
    f.write(",\n".join(values_list))
    f.write(";\n")

print(f"Generated SQL seed file at '{sql_path}' with {len(rows)} records.")
