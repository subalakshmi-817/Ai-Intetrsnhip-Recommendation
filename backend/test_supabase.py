import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_ANON_KEY") or os.environ.get("SUPABASE_KEY")

if not url or not key:
    print("Error: SUPABASE_URL or SUPABASE_KEY not found in environment.")
    exit(1)

supabase: Client = create_client(url, key)

tables = ["profiles", "internships", "student_skills", "recommendations"]

print(f"Connecting to Supabase at {url}...")

for table in tables:
    try:
        res = supabase.table(table).select("*").limit(1).execute()
        print(f"✅ Table '{table}' exists and is accessible!")
    except Exception as e:
        print(f"⚠️ Table '{table}' check result: {e}")
