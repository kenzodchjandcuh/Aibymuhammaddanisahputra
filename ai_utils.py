"""
AI Assistant Utilities
Copyright (c) 2026 Muhammad Dani Sahputra
All rights reserved.

Specialized functions for various AI tasks:
- Code Review
- Content Generation
- Concept Explanation
- Brainstorming
- Translation
- Summarization

Powered by Google Generative AI
"""

import google.genai as genai
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

class SpecializedAI:
    """AI dengan spesialisasi untuk task tertentu"""
    
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key or api_key.startswith("YOUR_"):
            raise ValueError("GOOGLE_API_KEY belum dikonfigurasi!")
        self.client = genai.Client(api_key=api_key)
    
    def code_reviewer(self, code_snippet):
        """Review code dan berikan saran"""
        prompt = f"""
        Silakan review code berikut dan berikan:
        1. Analisis code
        2. Potential bugs
        3. Saran improvement
        4. Best practices
        
        CODE:
        ```
        {code_snippet}
        ```
        """
        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return response.text
    
    def content_generator(self, topic, word_count=500):
        """Generate konten artikel"""
        prompt = f"Buatkan artikel tentang '{topic}' dengan {word_count} kata"
        response = self.model.generate_content(prompt)
        return response.text
    
    def explain_concept(self, concept, level="intermediate"):
        """Jelaskan konsep dengan level kesulitan tertentu"""
        prompt = f"""
        Jelaskan konsep '{concept}' dengan level '{level}'.
        Gunakan contoh untuk memperjelas.
        """
        response = self.model.generate_content(prompt)
        return response.text
    
    def generate_ideas(self, topic, count=5):
        """Generate ide-ide kreatif"""
        prompt = f"Berikan {count} ide kreatif tentang: {topic}"
        response = self.model.generate_content(prompt)
        return response.text
    
    def translate_text(self, text, target_language):
        """Terjemahkan teks"""
        prompt = f'Terjemahkan ke {target_language}:\n"{text}"'
        response = self.model.generate_content(prompt)
        return response.text
    
    def summarize_text(self, text):
        """Ringkasan teks/artikel"""
        prompt = f'Buatkan ringkasan singkat:\n{text}'
        response = self.model.generate_content(prompt)
        return response.text

# Example usage
if __name__ == "__main__":
    try:
        ai = SpecializedAI()
        
        # Example: Review code
        sample_code = '''
def calculate(x, y):
    return x + y
print(calculate(5))
        '''
        
        print("=" * 60)
        print("CODE REVIEW EXAMPLE")
        print("=" * 60)
        result = ai.code_reviewer(sample_code)
        print(result)
        
        print("\n" + "=" * 60)
        print("CONCEPT EXPLANATION EXAMPLE")
        print("=" * 60)
        result = ai.explain_concept("Python List Comprehension")
        print(result)
        
    except ValueError as e:
        print(f"Error: {e}")
