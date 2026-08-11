import os
import json
import urllib.request
import urllib.error
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("SUPABASE_URL", "").rstrip("/")
key = os.environ.get("SUPABASE_KEY") or os.environ.get("SUPABASE_ANON_KEY")

endpoint = f"{url}/rest/v1/internships"

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

test_payload = [{
    "title": "Test Connection Intern",
    "company_name": "TestCorp",
    "domain": "Software Engineering",
    "required_skills": ["Python", "API"],
    "location": "Remote",
    "type": "Remote",
    "description": "Test entry to check Supabase REST connection",
    "status": "open"
}]

req = urllib.request.Request(endpoint, data=json.dumps(test_payload).encode("utf-8"), headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as response:
        print(f"Status code: {response.status}")
        print("✅ Successfully inserted test record via Supabase REST API!")
except urllib.error.HTTPError as e:
    print(f"❌ HTTP Error {e.code}: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"❌ Error: {e}")
