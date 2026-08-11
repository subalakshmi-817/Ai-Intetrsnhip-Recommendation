import csv
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY") or os.environ.get("SUPABASE_ANON_KEY")

if not url or not key:
    print("❌ Error: SUPABASE_URL or SUPABASE_KEY is missing from environment variables.")
    exit(1)

supabase: Client = create_client(url, key)

csv_path = "backend/internships.csv"

if not os.path.exists(csv_path):
    csv_path = "internships.csv"

records = []
with open(csv_path, mode="r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Convert comma-separated string to PostgreSQL array list
        skills = [s.strip() for s in row["required_skills"].split(",") if s.strip()]
        
        # Determine remote vs on-site type
        loc = row["location"]
        if "Remote" in loc:
            itype = "Remote"
        elif "Hybrid" in loc:
            itype = "Hybrid"
        else:
            itype = "On-site"

        record = {
            "title": row["title"],
            "company_name": row["company"],
            "domain": row["domain"],
            "required_skills": skills,
            "location": row["location"],
            "type": itype,
            "stipend": row["stipend"],
            "duration": row["duration"],
            "eligibility": row["eligibility"],
            "description": row["description"],
            "status": "open"
        }
        records.append(record)

print(f"Importing {len(records)} internship records to Supabase 'internships' table...")

# Batch insert (50 records per batch)
batch_size = 50
inserted_count = 0

for i in range(0, len(records), batch_size):
    batch = records[i:i + batch_size]
    try:
        data, count = supabase.table("internships").insert(batch).execute()
        inserted_count += len(batch)
        print(f"  Uploaded {inserted_count}/{len(records)} records...")
    except Exception as e:
        print(f"❌ Error uploading batch {i//batch_size + 1}: {e}")

print("🎉 Import process finished!")
