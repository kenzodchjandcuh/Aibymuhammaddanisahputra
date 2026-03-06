"""
Contoh penggunaan ContentCleaner dari ai_utils.py

Demonstrasi semua fungsi pembersihan untuk output AI
"""

from ai_utils import ContentCleaner

# ============================================
# EXAMPLE 1: Clean Text (Bersihkan Teks)
# ============================================
print("=" * 70)
print("EXAMPLE 1: CLEAN TEXT")
print("=" * 70)

messy_text = """
Ini adalah teks    yang      sangat   berantakan.
Ada   banyak  spasi    berlebih.


Dan juga banyak    baris kosong.


Teks ini perlu dibersihkan   dengan   baik.
"""

cleaned_text = ContentCleaner.clean_text(messy_text)
print("BEFORE:")
print(repr(messy_text))
print("\nAFTER:")
print(repr(cleaned_text))


# ============================================
# EXAMPLE 2: Detect Language (Deteksi Bahasa)
# ============================================
print("\n" + "=" * 70)
print("EXAMPLE 2: DETECT PROGRAMMING LANGUAGE")
print("=" * 70)

code_samples = {
    'python': '''
def greet(name):
    print(f"Hello, {name}!")
    return True

if __name__ == "__main__":
    greet("World")
''',
    'javascript': '''
function greet(name) {
    console.log(`Hello, ${name}!`);
    return true;
}

module.exports = greet;
''',
    'html': '''
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
''',
}

for expected_lang, code in code_samples.items():
    detected = ContentCleaner.detect_language(code)
    status = "✓" if detected == expected_lang else "✗"
    print(f"{status} Expected: {expected_lang:12} | Detected: {detected}")


# ============================================
# EXAMPLE 3: Clean Code (Bersihkan Kode)
# ============================================
print("\n" + "=" * 70)
print("EXAMPLE 3: CLEAN CODE")
print("=" * 70)

messy_code = '''```python
def  calculate_sum( numbers ):
	total   =  0
	for    num    in    numbers:
		total   +=   num
	return    total

result = calculate_sum([1, 2, 3, 4, 5])
print(result)
```'''

result = ContentCleaner.clean_code(messy_code)
print(f"Language Detected: {result['language']}")
print(f"Indentation Type: {result['indentation_type']}")
print(f"Has Syntax Issues: {result['has_syntax_issues']}")
print(f"\nCLEANED CODE:\n")
print(result['cleaned_code'])
print(f"\nSyntax Warnings: {result.get('syntax_warnings')}")


# ============================================
# EXAMPLE 4: Clean AI Response (Response Lengkap)
# ============================================
print("\n" + "=" * 70)
print("EXAMPLE 4: CLEAN COMPLETE AI RESPONSE")
print("=" * 70)

ai_response = '''
Berikut adalah   solusi    untuk masalah Anda:

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

Penjelasan:
- Fungsi menggunakan    rekursi
- Base case adalah n <= 1
- Dikembalikan nilai fibonacci

```javascript
function fib(n) {
  return n <= 1 ? n : fib(n-1) + fib(n-2);
}
```

Kedua versi melakukan    hal yang sama!
'''

result = ContentCleaner.clean_ai_response(ai_response)
print(f"Has Code Blocks: {result['has_code']}")
print(f"Number of Code Blocks: {len(result['code_blocks'])}")
print(f"\nCLEANED TEXT:\n{result['text']}")
print(f"\nCODE BLOCKS FOUND:")
for i, code_block in enumerate(result['code_blocks'], 1):
    print(f"\n--- Code Block {i} ({code_block['language']}) ---")
    print(code_block['cleaned_code'][:100] + "...")


# ============================================
# EXAMPLE 5: Praktik Terbaik
# ============================================
print("\n" + "=" * 70)
print("EXAMPLE 5: BEST PRACTICES - Integration Pattern")
print("=" * 70)

class AIResponseHandler:
    """Contoh integrasi ContentCleaner ke dalam aplikasi"""
    
    def __init__(self):
        self.cleaner = ContentCleaner
    
    def process_ai_response(self, response):
        """Process response dari AI dengan berbagai formay"""
        
        # Bersihkan response lengkap
        cleaned = self.cleaner.clean_ai_response(response)
        
        return {
            'summary': cleaned['text'][:100] + '...',
            'has_code': cleaned['has_code'],
            'code_count': len(cleaned['code_blocks']),
            'first_language': cleaned['code_blocks'][0]['language'] if cleaned['code_blocks'] else 'N/A',
            'full_result': cleaned
        }

handler = AIResponseHandler()
result = handler.process_ai_response(ai_response)
print(f"Summary: {result['summary']}")
print(f"Has Code: {result['has_code']}")
print(f"Languages Found: {result['first_language']}")

print("\n" + "=" * 70)
print("✓ All examples completed successfully!")
print("=" * 70)
