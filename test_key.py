from dotenv import load_dotenv
import os
import google.genai as genai

load_dotenv()
key = os.getenv("GOOGLE_API_KEY")
print("KEY SET:", bool(key))
try:
    if not key:
        raise EnvironmentError("GOOGLE_API_KEY not found in environment")
    client = genai.Client(api_key=key)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Halo"
    )
    print("RESPONSE:", response.text)
except Exception as e:
    print("ERROR TYPE:", type(e))
    print("ERROR:", e)
