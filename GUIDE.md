# 📚 PANDUAN LENGKAP APLIKASI AI

## 📁 Struktur File

```
ai/
├── ai_app.py              # Versi dasar - chat sederhana
├── ai_advanced.py         # Versi advanced - dengan features lengkap
├── ai_utils.py           # Utility untuk use case spesifik
├── requirements.txt       # Dependencies yang diperlukan
├── .env.example          # Template konfigurasi
├── setup.bat             # Setup script untuk Windows
├── setup.sh              # Setup script untuk Linux/Mac
├── README.md             # Dokumentasi
└── GUIDE.md              # File ini
```

## 🚀 Quick Start

### Windows:
```bash
# 1. Buka Command Prompt/PowerShell
# 2. Navigasi ke folder ai
cd /path/to/ai

# 3. Jalankan setup
setup.bat

# 4. Edit .env dan isi API key

# 5. Jalankan aplikasi
python ai_app.py
```

### Linux/Mac:
```bash
# 1. Buka Terminal
# 2. Navigasi ke folder ai
cd /path/to/ai

# 3. Jalankan setup
chmod +x setup.sh
./setup.sh

# 4. Edit .env dan isi API key

# 5. Jalankan aplikasi
python3 ai_app.py
```

## 📋 File Penjelasan

### 1. **ai_app.py** - Versi Dasar
- ✅ Chat interaktif sederhana
- ✅ Cocok untuk pemula
- ✅ Lightweight dan cepat

**Cara pakai:**
```bash
python ai_app.py
```

**Fitur:**
- Tanya jawab interaktif
- Simpel dan mudah
- Direct response

---

### 2. **ai_advanced.py** - Versi Advanced
- ✅ Context-aware conversation
- ✅ Simpan conversation history
- ✅ Command system (/save, /clear, /show)
- ✅ Lebih powerful

**Cara pakai:**
```bash
python ai_advanced.py
```

**Commands:**
```
/save   - Simpan conversation ke JSON
/clear  - Hapus conversation
/show   - Lihat history
/help   - Bantuan
/exit   - Keluar
```

**Fitur Unggulan:**
- Mengingat conversation sebelumnya (context-aware)
- Auto-save ke JSON
- History management
- Better error handling

---

### 3. **ai_utils.py** - Utility Khusus
Untuk task-task spesifik:

```python
from ai_utils import SpecializedAI

ai = SpecializedAI()

# 1. Review code
result = ai.code_reviewer(code_snippet)

# 2. Generate artikel
result = ai.content_generator("Topic", word_count=500)

# 3. Jelaskan konsep
result = ai.explain_concept("Konsep", level="beginner")

# 4. Generate ide
result = ai.generate_ideas("Topic", count=5)

# 5. Terjemah
result = ai.translate_text("Text", "Indonesian")

# 6. Ringkas
result = ai.summarize_text(text)
```

**Cara pakai sebagai library:**
```python
from ai_utils import SpecializedAI

ai = SpecializedAI()
summary = ai.summarize_text("Long article text...")
print(summary)
```

---

## 🔑 Konfigurasi API Key

### Metode 1: .env file (Recommended)
1. Buat file `.env`:
   ```
   GOOGLE_API_KEY=sk-xxx...
   ```
2. Program akan auto-load

### Metode 2: Environment Variable
**Windows (Command Prompt):**
```bash
set GOOGLE_API_KEY=sk-xxx...
python ai_app.py
```

**Windows (PowerShell):**
```bash
$env:GOOGLE_API_KEY="sk-xxx..."
python ai_app.py
```

**Linux/Mac:**
```bash
export GOOGLE_API_KEY="sk-xxx..."
python3 ai_app.py
```

### Metode 3: Hardcode (Tidak Secure - hanya untuk testing)
Langsung edit di file:
```python
API_KEY = "sk-xxx..."
```

---

## 🎯 Use Case Contoh

### 1. Chat Bot Sederhana
```bash
python ai_app.py
# Ketik pertanyaan, dapatkan jawaban instant
```

### 2. Coding Assistant
```python
from ai_utils import SpecializedAI
ai = SpecializedAI()
print(ai.code_reviewer(your_code))
```

### 3. Content Generator
```python
from ai_utils import SpecializedAI
ai = SpecializedAI()
print(ai.content_generator("Topic", word_count=1000))
```

### 4. Tutor/Explainer
```python
from ai_utils import SpecializedAI
ai = SpecializedAI()
print(ai.explain_concept("Algoritma"))
```

### 5. Conversation dengan Memory
```bash
python ai_advanced.py
# AI mengingat context percakapan sebelumnya
```

---

## 🐛 Troubleshooting

### Error: "No module named 'google'"
```bash
pip install google-generativeai --upgrade
```

### Error: "GOOGLE_API_KEY belum dikonfigurasi"
1. Buka: https://makersuite.google.com/app/apikey
2. Klik "Create API Key"
3. Copy dan paste ke .env atau environment variable

### Error: "Rate limit exceeded"
- Tunggu beberapa saat
- Gunakan free tier dengan bijak

### Error: "Connection timeout"
- Pastikan internet terhubung
- Cek firewall

---

## 💾 Output & Saving

### auto-save conversation (ai_advanced.py):
- Otomatis disimpan ke `chat_history.json`
- Format JSON untuk easy parsing
- Load otomatis saat start

### Manual save:
```
Dalam aplikasi, ketik: /save
```

---

## 🔧 Customization

### Ubah Model
Edit file dan ganti:
```python
self.model = genai.GenerativeModel('gemini-pro')
# Bisa pakai: gemini-pro-vision (untuk images)
```

### Custom System Prompt
```python
system_prompt = "You are a Python expert..."
ai.ask(question, system_prompt=system_prompt)
```

### Ubah Temperature (Kreativitas)
```python
generation_config = genai.types.GenerationConfig(
    temperature=0.9  # 0-1, higher = more creative
)
model = genai.GenerativeModel(
    'gemini-pro',
    generation_config=generation_config
)
```

---

## 📊 API Pricing

**Google Generative AI (Gemini):**
- FREE untuk development!
- Gratis sampai rate limit reasonable
- Perfect untuk learning & prototyping

---

## 🔗 Referensi Berguna

- 📖 Dokumentasi: https://ai.google.dev
- 🔑 Get API Key: https://makersuite.google.com/app/apikey
- 📚 API Reference: https://ai.google.dev/api
- 💬 Discord Community: https://discord.gg/google-ai

---

## ✅ Checklist Setup

- [ ] Python 3.8+ terinstall
- [ ] API key dari Google diperoleh
- [ ] requirements.txt sudah di-install
- [ ] .env file dikonfigurasi dengan API key
- [ ] Test dengan `python ai_app.py`
- [ ] Berhasil dapat respons dari AI ✨

---

## 🤝 Support & Issues

Jika ada masalah:

1. Cek dokumentasi di README.md
2. Pastikan API key valid
3. Check internet connection
4. Coba run dari folder yang benar
5. Lihat error message dengan teliti

---

**Copyright (c) 2026 Muhammad Dani Sahputra. All rights reserved.**

**Selamat menggunakan AI Assistant! 🚀**
