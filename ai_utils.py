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


class ContentCleaner:
    """Berfungsi untuk membersihkan output dari AI"""
    
    # Mapping bahasa programming populer
    LANGUAGE_KEYWORDS = {
        'python': ['def', 'class', 'import', 'from', 'if __name__', 'self', 'elif', 'except', 'async', 'await'],
        'javascript': ['function', 'const', 'let', 'var', 'async', 'await', 'require', 'module.exports', 'class'],
        'java': ['public class', 'private', 'public', 'static', 'import', 'package', 'interface', 'extends'],
        'cpp': ['#include', 'using namespace', 'cout', 'cin', 'vector', 'template'],
        'csharp': ['using', 'public class', 'namespace', 'async', 'await', 'LINQ'],
        'html': ['<!DOCTYPE', '<html', '<head', '<body', '<div', '<span', '<p>'],
        'css': ['@media', '.class', '#id', 'background', 'color', 'font-size', 'margin'],
        'sql': ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'INSERT', 'UPDATE'],
        'bash': ['#!/bin/bash', 'echo', 'grep', 'sed', 'awk', 'for', 'while'],
    }
    
    @staticmethod
    def clean_text(text):
        """
        Bersihkan teks dengan menghilangkan whitespace berlebih
        
        Args:
            text (str): Teks yang akan dibersihkan
            
        Returns:
            str: Teks yang sudah dibersihkan
        """
        if not isinstance(text, str):
            return text
        
        # Hapus leading/trailing whitespace
        text = text.strip()
        
        # Hapus multiple spaces menjadi single space
        text = ' '.join(text.split())
        
        # Hapus multiple newlines (lebih dari 2 baris kosong)
        while '\n\n\n' in text:
            text = text.replace('\n\n\n', '\n\n')
        
        return text
    
    @staticmethod
    def detect_language(code):
        """
        Deteksi bahasa programming dari kode
        
        Args:
            code (str): Potongan kode
            
        Returns:
            str: Nama bahasa yang terdeteksi
        """
        code_lower = code.lower()
        scores = {}
        
        for lang, keywords in ContentCleaner.LANGUAGE_KEYWORDS.items():
            score = sum(1 for kw in keywords if kw.lower() in code_lower)
            scores[lang] = score
        
        detected = max(scores, key=scores.get) if scores else 'unknown'
        return detected if scores.get(detected, 0) > 0 else 'unknown'
    
    @staticmethod
    def clean_code(code, auto_detect_language=True):
        """
        Bersihkan kode dengan:
        - Hapus markdown backticks
        - Fix indentasi
        - Deteksi bahasa
        
        Args:
            code (str): Kode yang akan dibersihkan
            auto_detect_language (bool): Deteksi bahasa otomatis
            
        Returns:
            dict: {
                'cleaned_code': str,
                'language': str,
                'indentation_type': str,
                'has_syntax_issues': bool
            }
        """
        if not isinstance(code, str):
            return {'cleaned_code': '', 'language': 'unknown', 'indentation_type': 'unknown', 'has_syntax_issues': False}
        
        cleaned = code.strip()
        language = 'unknown'
        indentation_type = 'unknown'
        has_issues = False
        
        # Step 1: Hapus markdown backticks
        markdown_patterns = [
            (r'^```[\w]*\n', ''),  # Opening backticks with optional language
            (r'\n```$', ''),       # Closing backticks
            (r'^```', ''),         # Single backticks at start
            (r'```$', ''),         # Single backticks at end
        ]
        
        import re
        for pattern, replacement in markdown_patterns:
            cleaned = re.sub(pattern, replacement, cleaned)
        
        cleaned = cleaned.strip()
        
        # Step 2: Deteksi bahasa
        if auto_detect_language:
            language = ContentCleaner.detect_language(cleaned)
        
        # Step 3: Analisis indentasi
        lines = cleaned.split('\n')
        indent_chars = set()
        for line in lines:
            if line and line[0] in ' \t':
                indent_chars.add(line[0])
        
        if '\t' in indent_chars:
            indentation_type = 'tabs'
        elif ' ' in indent_chars:
            indentation_type = 'spaces'
        else:
            indentation_type = 'none'
        
        # Step 4: Normalisasi indentasi (tabs to spaces)
        if indentation_type == 'tabs':
            cleaned = cleaned.replace('\t', '    ')
            indentation_type = 'spaces (fixed)'
        
        # Step 5: Hapus trailing whitespace di setiap baris
        cleaned = '\n'.join(line.rstrip() for line in cleaned.split('\n'))
        
        # Step 6: Hapus multiple empty lines
        while '\n\n\n' in cleaned:
            cleaned = cleaned.replace('\n\n\n', '\n\n')
        
        # Cek untuk indikasi syntax issues (basic check)
        unclosed_brackets = cleaned.count('{') - cleaned.count('}')
        unclosed_parens = cleaned.count('(') - cleaned.count(')')
        unclosed_squares = cleaned.count('[') - cleaned.count(']')
        
        has_issues = unclosed_brackets != 0 or unclosed_parens != 0 or unclosed_squares != 0
        
        return {
            'cleaned_code': cleaned,
            'language': language,
            'indentation_type': indentation_type,
            'has_syntax_issues': has_issues,
            'syntax_warnings': {
                'unclosed_brackets': unclosed_brackets,
                'unclosed_parens': unclosed_parens,
                'unclosed_squares': unclosed_squares,
            } if has_issues else None
        }
    
    @staticmethod
    def clean_ai_response(response_text, extract_code=False):
        """
        Bersihkan response lengkap dari AI (mixing teks dan kode)
        
        Args:
            response_text (str): Response dari AI
            extract_code (bool): Extract hanya bagian kode
            
        Returns:
            dict: {
                'text': str (cleaned text),
                'code_blocks': list (if any),
                'has_code': bool
            }
        """
        if not isinstance(response_text, str):
            return {'text': '', 'code_blocks': [], 'has_code': False}
        
        import re
        
        # Deteksi code blocks
        code_block_pattern = r'```[\w]*\n(.*?)\n```'
        code_blocks = re.findall(code_block_pattern, response_text, re.DOTALL)
        
        # Extract dan clean setiap code block
        cleaned_code_blocks = []
        for code in code_blocks:
            result = ContentCleaner.clean_code(code)
            cleaned_code_blocks.append(result)
        
        # Hapus code blocks dari teks untuk mendapat clean text
        text_without_code = re.sub(code_block_pattern, '\n', response_text, flags=re.DOTALL)
        cleaned_text = ContentCleaner.clean_text(text_without_code)
        
        return {
            'text': cleaned_text,
            'code_blocks': cleaned_code_blocks,
            'has_code': len(code_blocks) > 0
        }

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
