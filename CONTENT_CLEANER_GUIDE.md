# 🧹 Content Cleaner - Dokumentasi Lengkap

Dokumentasi lengkap untuk modul pembersihan teks dan kode AI.

## 📋 Daftar Isi
1. [Pengenalan](#pengenalan)
2. [Fitur Utama](#fitur-utama)
3. [Instalasi & Setup](#instalasi--setup)
4. [Python API Reference](#python-api-reference)
5. [JavaScript API Reference](#javascript-api-reference)
6. [Contoh Penggunaan](#contoh-penggunaan)
7. [Integration Patterns](#integration-patterns)

---

## 🎯 Pengenalan

**Content Cleaner** adalah modul yang dirancang untuk membersihkan dan memformat output dari AI (terutama Google Gemini). Modul ini:

- ✅ Menghapus whitespace berlebih dari teks
- ✅ Membersihkan markdown backticks dari kode
- ✅ Mendeteksi bahasa programming secara otomatis
- ✅ Memperbaiki indentasi kode
- ✅ Mendeteksi potensi syntax issues
- ✅ Tersedia di Python dan JavaScript

---

## ⚡ Fitur Utama

### 1. **Text Cleaning**
```
Input:  "Ini    adalah    teks    yang     berantakan.\n\n\n\nDan banyak spasi"
Output: "Ini adalah teks yang berantakan. Dan banyak spasi"
```

### 2. **Code Cleaning**
```
Input:  ```python\ndef  func( ):\n\treturn True```
Output: def func():
        return True
        (dengan indentasi yang rapi)
```

### 3. **Language Detection**
```
Input:  "def foo():\n    return 42"
Output: "python" (terdeteksi otomatis)
```

### 4. **AI Response Processing**
Membersihkan keseluruhan response AI yang berisi mix teks dan kode blocks.

---

## 🚀 Instalasi & Setup

### Python

Sudah ada di `ai_utils.py`. Cukup import dan gunakan:

```python
from ai_utils import ContentCleaner

# Gunakan langsung
cleaned = ContentCleaner.clean_text(messy_text)
```

### JavaScript

Sudah ada di `advanced.js`. Sudah tersedia sebagai global object:

```javascript
// Gunakan langsung di console browser
const cleaned = ContentCleaner.cleanText(messyText);
```

---

## 📚 Python API Reference

### `ContentCleaner.clean_text(text)`

Bersihkan teks dengan menghilangkan whitespace berlebih.

**Parameters:**
- `text` (str): Teks yang akan dibersihkan

**Returns:**
- `str`: Teks yang sudah dibersihkan

**Contoh:**
```python
messy = "Halo    dunia\n\n\nIni   teks   berantakan"
clean = ContentCleaner.clean_text(messy)
# Output: "Halo dunia\n\nIni teks berantakan"
```

---

### `ContentCleaner.detect_language(code)`

Deteksi bahasa programming dari potongan kode.

**Parameters:**
- `code` (str): Potongan kode

**Returns:**
- `str`: Nama bahasa (python, javascript, java, cpp, csharp, html, css, sql, bash, unknown)

**Contoh:**
```python
code = "def hello():\n    print('Hi')"
lang = ContentCleaner.detect_language(code)
# Output: "python"
```

---

### `ContentCleaner.clean_code(code, auto_detect_language=True)`

Bersihkan kode dengan hapus markdown, fix indentasi, dan deteksi bahasa.

**Parameters:**
- `code` (str): Kode yang akan dibersihkan
- `auto_detect_language` (bool): Deteksi bahasa otomatis (default: True)

**Returns:**
- `dict`:
  ```python
  {
      'cleaned_code': str,              # Kode yang sudah dibersihkan
      'language': str,                  # Bahasa yang terdeteksi
      'indentation_type': str,          # 'tabs', 'spaces', 'none', 'spaces (fixed)'
      'has_syntax_issues': bool,        # Ada bracket/paren tidak tertutup?
      'syntax_warnings': dict or None   # Detail unclosed brackets jika ada
  }
  ```

**Contoh:**
```python
code = """```python
def  calc( x , y ):
\tsum  =  x + y
\treturn sum
```"""

result = ContentCleaner.clean_code(code)
print(result['cleaned_code'])
# Output:
# def calc(x, y):
#     sum = x + y
#     return sum
print(result['language'])        # Output: "python"
print(result['indentation_type'])  # Output: "spaces (fixed)"
```

---

### `ContentCleaner.clean_ai_response(response_text, extract_code=False)`

Bersihkan response lengkap dari AI (mix teks dan kode).

**Parameters:**
- `response_text` (str): Response dari AI
- `extract_code` (bool): Extract hanya bagian kode (default: False)

**Returns:**
- `dict`:
  ```python
  {
      'text': str,              # Teks yang dibersihkan (tanpa code blocks)
      'code_blocks': list,      # List of cleaned code blocks
      'has_code': bool          # Apakah ada code blocks?
  }
  ```

**Contoh:**
```python
response = """
Berikut solusinya:

```python
def fibonacci(n):
    return n if n <= 1 else fibonacci(n-1) + fibonacci(n-2)
```

Penjelasan    singkat....
"""

result = ContentCleaner.clean_ai_response(response)
print(result['text'])
# Output: "Berikut solusinya: Penjelasan singkat...."

print(result['has_code'])  # Output: True
print(result['code_blocks'][0]['language'])  # Output: "python"
```

---

## 📚 JavaScript API Reference

### `ContentCleaner.cleanText(text)`

Bersihkan teks dengan menghilangkan whitespace berlebih.

**Parameters:**
- `text` (string): Teks yang akan dibersihkan

**Returns:**
- `string`: Teks yang sudah dibersihkan

```javascript
const messy = "Halo    dunia\n\n\nIni   teks   berantakan";
const clean = ContentCleaner.cleanText(messy);
// Output: "Halo dunia\n\nIni teks berantakan"
```

---

### `ContentCleaner.detectLanguage(code)`

Deteksi bahasa programming dari kode.

**Parameters:**
- `code` (string): Potongan kode

**Returns:**
- `string`: Nama bahasa yang terdeteksi

```javascript
const code = "def hello():\n    print('Hi')";
const lang = ContentCleaner.detectLanguage(code);
// Output: "python"
```

---

### `ContentCleaner.cleanCode(code, autoDetect=true)`

Bersihkan kode dengan hapus markdown, fix indentasi.

**Parameters:**
- `code` (string): Kode yang akan dibersihkan
- `autoDetect` (boolean): Deteksi bahasa otomatis (default: true)

**Returns:**
- `object`:
  ```javascript
  {
      cleaned_code: string,         // Kode yang dibersihkan
      language: string,             // Bahasa terdeteksi
      indentation_type: string,     // 'tabs', 'spaces', 'none', 'spaces (fixed)'
      has_syntax_issues: boolean,   // Ada bracket tidak seimbang?
      syntax_warnings: object|null  // Detail jika ada issues
  }
  ```

```javascript
const code = `\`\`\`python
def calc(x, y):
\treturn x + y
\`\`\``;

const result = ContentCleaner.cleanCode(code);
console.log(result.cleaned_code);
// Output: "def calc(x, y):\n    return x + y"
```

---

### `ContentCleaner.cleanAIResponse(responseText, extractCode=false)`

Bersihkan response lengkap dari AI.

**Parameters:**
- `responseText` (string): Response dari AI
- `extractCode` (boolean): Extract hanya kode (default: false)

**Returns:**
- `object`:
  ```javascript
  {
      text: string,         // Teks dibersihkan
      code_blocks: array,   // Array of cleaned code blocks
      has_code: boolean     // Ada code blocks?
  }
  ```

```javascript
const response = `
Solusinya adalah:

\`\`\`python
def solve():
    return True
\`\`\`

Selesai!
`;

const result = ContentCleaner.cleanAIResponse(response);
console.log(result.text);        // "Solusinya adalah: Selesai!"
console.log(result.has_code);    // true
console.log(result.code_blocks[0].language);  // "python"
```

---

### `ContentCleaner.formatCodeForDisplay(code)`

Format kode untuk display di HTML dengan syntax hints.

**Returns:**
- `object`:
  ```javascript
  {
      cleaned_code: string,
      language: string,
      formatted_html: string,        // HTML siap tampil
      language_display: string       // "📝 PYTHON" dsb
  }
  ```

---

### `ContentCleaner.escapeHtml(text)`

Escape HTML untuk keamanan (mencegah XSS).

```javascript
const dangerous = "<script>alert('xss')</script>";
const safe = ContentCleaner.escapeHtml(dangerous);
// Output: "&lt;script&gt;alert('xss')&lt;/script&gt;"
```

---

## 💡 Contoh Penggunaan

### Contoh 1: Setup Dasar (Python)

```python
from ai_utils import ContentCleaner

# Bersihkan simple text
text = ContentCleaner.clean_text("Hello    world   !!!")
print(text)  # Output: "Hello world !!!"

# Deteksi bahasa
language = ContentCleaner.detect_language("import numpy as np")
print(language)  # Output: "python"
```

### Contoh 2: Proses Response AI (Python)

```python
from ai_utils import SpecializedAI, ContentCleaner

ai = SpecializedAI()

# Generate content
response = ai.code_reviewer(some_code)

# Clean the response
result = ContentCleaner.clean_ai_response(response)

print("Text:", result['text'])
for code in result['code_blocks']:
    print(f"Language: {code['language']}")
    print(f"Code:\n{code['cleaned_code']}")
```

### Contoh 3: Setup Dasar (JavaScript)

```javascript
// Clean Text
const messyText = "This    is    messy       text";
const cleanText = ContentCleaner.cleanText(messyText);
console.log(cleanText);  // "This is messy text"

// Detect Language  
const language = ContentCleaner.detectLanguage("import numpy as np");
console.log(language);  // "python"
```

### Contoh 4: Display AI Response (JavaScript)

```javascript
// Assuming AI response dari backend
const aiResponse = await getAIResponse(userMessage);

// Clean it
const cleaned = ContentCleaner.cleanAIResponse(aiResponse);

// Create HTML untuk display
const messageDiv = document.createElement('div');
messageDiv.className = 'ai-message';

// Add text
const textDiv = document.createElement('div');
textDiv.className = 'message-text';
textDiv.textContent = cleaned.text;
messageDiv.appendChild(textDiv);

// Add code blocks
cleaned.code_blocks.forEach(codeBlock => {
    const codeDiv = document.createElement('div');
    codeDiv.className = `code-block language-${codeBlock.language}`;
    codeDiv.innerHTML = `
        <div class="code-header">
            <span>${codeBlock.language.toUpperCase()}</span>
            <button onclick="copyCode(this)">Copy</button>
        </div>
        <pre><code>${ContentCleaner.escapeHtml(codeBlock.cleaned_code)}</code></pre>
    `;
    messageDiv.appendChild(codeDiv);
});

// Append ke chat
document.getElementById('chatMessages').appendChild(messageDiv);
```

---

## 🔌 Integration Patterns

### Pattern 1: Backend Processing (Python)

```python
# Di ai_app.py atau API endpoint

from ai_utils import SpecializedAI, ContentCleaner

class AIEndpoint:
    def __init__(self):
        self.ai = SpecializedAI()
        self.cleaner = ContentCleaner
    
    def generate_and_clean(self, prompt):
        """Generate content dan return cleaned result"""
        response = self.ai.code_reviewer(prompt)
        cleaned = self.cleaner.clean_ai_response(response)
        
        return {
            'text': cleaned['text'],
            'code_blocks': cleaned['code_blocks'],
            'has_code': cleaned['has_code']
        }

endpoint = AIEndpoint()
result = endpoint.generate_and_clean(user_code)
# Return result sebagai JSON ke frontend
```

### Pattern 2: Frontend Processing (JavaScript)

```javascript
// Di advanced.js message handler

async function sendMessage() {
    const userMessage = elements.userInput.value;
    
    // Get AI response
    const response = await fetch('/api/generateContent', {
        method: 'POST',
        body: JSON.stringify({ message: userMessage })
    });
    
    const data = await response.json();
    
    // Clean the response
    const cleaned = ContentCleaner.cleanAIResponse(data.response);
    
    // Display
    displayMessage({
        role: 'ai',
        text: cleaned.text,
        codeBlocks: cleaned.code_blocks
    });
}
```

### Pattern 3: Hybrid Processing

```python
# Backend: Generate dan transform

from ai_utils import SpecializedAI, ContentCleaner

def process_ai_response(prompt):
    ai = SpecializedAI()
    response = ai.generate_content(prompt)
    
    # Clean di backend
    cleaned = ContentCleaner.clean_ai_response(response)
    
    # Return sebagai structured data
    return {
        'summary': cleaned['text'][:100],
        'full_text': cleaned['text'],
        'code_blocks': [
            {
                'language': code['language'],
                'code': code['cleaned_code'],
                'has_issues': code['has_syntax_issues']
            }
            for code in cleaned['code_blocks']
        ]
    }
```

---

## 🧪 Testing

### Jalankan Python Examples

```bash
cd e:\gabutnyasaya.html\ai
python content_cleaner_examples.py
```

### Jalankan JavaScript Examples

1. Buka `advanced.html` di browser
2. Buka Developer Console (F12)
3. Paste code dari `content_cleaner_examples.js`
4. Lihat output di console

---

## ⚠️ Catatan Penting

### Limitations

1. **Language Detection** tidak 100% akurat untuk code yang sangat pendek
2. **Syntax Issues Detection** hanya menghitung bracket, tidak full parsing
3. Belum support deteksi untuk bahasa-bahasa lainnya (Rust, Go, Kotlin, dll)

### Best Practices

✅ Selalu gunakan `clean_ai_response()` untuk response lengkap yang mix teks dan kode
✅ Gunakan `detect_language()` sebelum syntax highlighting
✅ Escape HTML output dengan `escapeHtml()` untuk keamanan
✅ Cache hasil cleaning jika perlu performance

---

## 📞 Support

Issues atau suggestions? Hubungi maintainer atau buat issue di repository.

---

**Version:** 1.0.0  
**Last Updated:** 2026-03-06  
**Compatibility:** Python 3.7+, Modern Browsers (ES6+)
