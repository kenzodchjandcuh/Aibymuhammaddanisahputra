#!/usr/bin/env python
"""
Test Script untuk Content Cleaner - Verifikasi Semua Fitur
"""

from ai_utils import ContentCleaner

print("=" * 70)
print("🧪 TESTING CONTENT CLEANER - ALL FEATURES")
print("=" * 70)

# Test 1: Clean Text
print("\n✓ TEST 1: Clean Text")
print("-" * 70)
text = ContentCleaner.clean_text('Halo    dunia    berapi!!\n\n\nini test')
print(f"Input:  'Halo    dunia    berapi!!\\n\\n\\nini test'")
print(f"Output: {repr(text)}")
assert 'Halo dunia berapi!!' in text, "Text cleaning failed"
print("✓ PASSED\n")

# Test 2: Detect Language - Python
print("✓ TEST 2: Detect Language (Python)")
print("-" * 70)
code = '''def hello():
    return 42'''
lang = ContentCleaner.detect_language(code)
print(f"Code: def hello():\\n    return 42")
print(f"Detected Language: {lang}")
assert lang == 'python', f"Expected 'python', got '{lang}'"
print("✓ PASSED\n")

# Test 3: Detect Language - JavaScript
print("✓ TEST 3: Detect Language (JavaScript)")
print("-" * 70)
code = 'const x = 5; console.log(x);'
lang = ContentCleaner.detect_language(code)
print(f"Code: {code}")
print(f"Detected Language: {lang}")
assert lang == 'javascript', f"Expected 'javascript', got '{lang}'"
print("✓ PASSED\n")

# Test 4: Clean Code - Fix Indentation
print("✓ TEST 4: Clean Code (Fix Indentation)")
print("-" * 70)
messy_code = '''def    hello( ):
\treturn  42'''
result = ContentCleaner.clean_code(messy_code)
print(f"Input Language: {result['language']}")
print(f"Indentation Type: {result['indentation_type']}")
print(f"Has Syntax Issues: {result['has_syntax_issues']}")
print(f"Cleaned Code:\n{result['cleaned_code']}")
assert result['language'] == 'python', "Language detection failed"
assert result['indentation_type'] == 'spaces (fixed)', "Indentation fix failed"
print("✓ PASSED\n")

# Test 5: Clean Code - Remove Markdown Backticks
print("✓ TEST 5: Clean Code (Remove Markdown)")
print("-" * 70)
markdown_code = '''```python
def calc():
    return 1
```'''
result = ContentCleaner.clean_code(markdown_code)
print(f"Input has backticks: YES")
print(f"Output has backticks: NO")
print(f"Cleaned Code:\n{result['cleaned_code']}")
assert '```' not in result['cleaned_code'], "Backticks not removed"
print("✓ PASSED\n")

# Test 6: Detect Syntax Issues
print("✓ TEST 6: Detect Syntax Issues")
print("-" * 70)
bad_code = 'def foo():\n    return {'
result = ContentCleaner.clean_code(bad_code)
print(f"Code with unclosed bracket: def foo():\\n    return {{")
print(f"Has Syntax Issues: {result['has_syntax_issues']}")
print(f"Warnings: {result['syntax_warnings']}")
assert result['has_syntax_issues'] == True, "Syntax issue detection failed"
print("✓ PASSED\n")

# Test 7: Clean AI Response - Mixed Text and Code
print("✓ TEST 7: Clean AI Response (Mixed Content)")
print("-" * 70)
response = '''Berikut    adalah    solusi:

```python
def calc():
    return 1
```

Dan    ini    HTML:

```html
<!DOCTYPE html>
<html>
</html>
```

Selesai!'''
result = ContentCleaner.clean_ai_response(response)
print(f"Has Code Blocks: {result['has_code']}")
print(f"Number of Code Blocks: {len(result['code_blocks'])}")
print(f"Code Block Languages: {[cb['language'] for cb in result['code_blocks']]}")
print(f"Text (first 50 chars): {result['text'][:50]}...")
assert result['has_code'] == True, "Code detection failed"
assert len(result['code_blocks']) == 2, "Code block count mismatch"
assert result['code_blocks'][0]['language'] == 'python', "Python detection failed"
assert result['code_blocks'][1]['language'] == 'html', "HTML detection failed"
print("✓ PASSED\n")

# Test 8: All Supported Languages
print("✓ TEST 8: Language Detection - All Supported Languages")
print("-" * 70)
tests = {
    'python': 'import sys\nif __name__ == "__main__":',
    'javascript': 'const x = 5; module.exports = x;',
    'html': '<!DOCTYPE html>\n<html>',
    'css': '@media (max-width: 600px) { color: red; }',
    'java': 'public class Main { public static void main() {} }',
    'sql': 'SELECT * FROM users WHERE id = 1',
    'bash': '#!/bin/bash\necho "Hello"',
}

for expected_lang, code in tests.items():
    detected = ContentCleaner.detect_language(code)
    status = "✓" if detected == expected_lang else "✗"
    print(f"{status} {expected_lang.upper():12} -> Detected: {detected}")
    assert detected == expected_lang, f"Failed to detect {expected_lang}"

print("✓ PASSED\n")

# Test 9: Empty and Edge Cases
print("✓ TEST 9: Edge Cases")
print("-" * 70)

# Empty string
result = ContentCleaner.clean_text('')
print(f"Empty string: {repr(result)}")
assert result == '', "Empty string handling failed"

# Only whitespace
result = ContentCleaner.clean_text('   \n\n\n   ')
print(f"Only whitespace: {repr(result)}")
assert result == '', "Whitespace-only handling failed"

# Non-string input (returns as-is)
result = ContentCleaner.clean_text(None)
print(f"None input: {repr(result)}")
assert result is None, "None handling failed"

# Non-string input (int)
result = ContentCleaner.clean_text(123)
print(f"Integer input: {repr(result)}")
assert result == 123, "Integer handling failed"

print("✓ PASSED\n")

# Test 10: Performance Check
print("✓ TEST 10: Performance Check")
print("-" * 70)
import time

# Large text
large_text = "Hello    world   " * 1000
start = time.time()
result = ContentCleaner.clean_text(large_text)
elapsed = (time.time() - start) * 1000
print(f"Clean text (1000 iterations): {elapsed:.2f}ms")
assert elapsed < 100, "Performance issue: clean_text too slow"

# Multiple code blocks
large_response = ('```python\ndef test():\n    pass\n```\n' * 100)
start = time.time()
result = ContentCleaner.clean_ai_response(large_response)
elapsed = (time.time() - start) * 1000
print(f"Clean AI response (100 code blocks): {elapsed:.2f}ms")
assert elapsed < 500, "Performance issue: clean_ai_response too slow"

print("✓ PASSED\n")

# Summary
print("=" * 70)
print("✅ ALL TESTS PASSED!")
print("=" * 70)
print("\nTest Summary:")
print("✓ Test 1: Clean Text")
print("✓ Test 2: Detect Language (Python)")
print("✓ Test 3: Detect Language (JavaScript)")
print("✓ Test 4: Clean Code (Fix Indentation)")
print("✓ Test 5: Clean Code (Remove Markdown)")
print("✓ Test 6: Detect Syntax Issues")
print("✓ Test 7: Clean AI Response (Mixed Content)")
print("✓ Test 8: All Supported Languages")
print("✓ Test 9: Edge Cases")
print("✓ Test 10: Performance Check")
print("\n🎉 ContentCleaner implementation is working perfectly!")
print("=" * 70)
