# 🤖 AI Assistant - Aplikasi AI dengan Google Gemini

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini-4285F4.svg)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Aplikasi AI canggih yang menggunakan **Google Generative AI (Gemini)** dengan dua versi utama: **Web Interface** (HTML/CSS/JS) dan **Command Line** (Python CLI). Mendukung berbagai use case AI seperti code review, content generation, brainstorming, translation, dan summarization.

## ✨ Fitur Utama

### 🌐 Web Version (HTML/CSS/JS)
- **Interface Modern**: UI yang user-friendly dengan styling yang menarik
- **Real-time Chat**: Interaksi langsung dengan AI
- **Versi Dasar & Advanced**: Pilih sesuai kebutuhan
- **No Installation Required**: Jalankan langsung di browser
- **Responsive Design**: Kompatibel dengan desktop dan mobile

### 🐍 Python Version (CLI)
- **Terminal Interface**: Untuk pengguna yang suka command line
- **Batch Processing**: Proses multiple tasks sekaligus
- **Customizable**: Mudah dikustomisasi dan diintegrasikan
- **High Performance**: Optimasi untuk processing besar
- **API Integration**: Mudah diintegrasikan dengan sistem lain

### 🤖 AI Capabilities
- **Code Review**: Analisis dan saran improvement code
- **Content Generation**: Buat artikel, blog, atau konten kreatif
- **Brainstorming**: Generate ide-ide inovatif
- **Translation**: Terjemahan multi-bahasa
- **Summarization**: Ringkasan teks panjang
- **Question Answering**: Jawab pertanyaan kompleks
- **Creative Writing**: Tulis cerita, puisi, atau skenario

## 📋 Persyaratan Sistem

- **Python**: 3.8 atau lebih tinggi
- **RAM**: Minimum 2GB (4GB recommended)
- **Storage**: 100MB free space
- **Internet**: Koneksi stabil untuk API calls
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge) untuk web version

## 🚀 Quick Start (3 Menit Setup!)

### Step 1: Dapatkan Google API Key (Gratis)
1. Kunjungi: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Klik **"Create API Key"**
3. Copy API key yang dihasilkan
4. **PENTING**: Jaga kerahasiaan API key Anda!

### Step 2: Pilih Cara Setup

#### 🚀 **UNTUK PEMULA** (Rekomendasi)
```bash
# Double-click file ini: start.html
# Pilih versi yang diinginkan dari menu
```

#### 💻 **WINDOWS USERS**
```cmd
# 1. Double-click: setup.bat
# 2. Script akan install dependencies otomatis
# 3. Edit file .env dengan API key Anda
# 4. Jalankan: python ai_app.py
```

#### 🐧 **LINUX/MAC USERS**
```bash
# 1. Buka Terminal
cd /path/to/ai/folder

# 2. Jalankan setup
chmod +x setup.sh
./setup.sh

# 3. Edit .env file
nano .env  # atau editor favorit Anda

# 4. Jalankan aplikasi
python3 ai_app.py
```

## 📁 Struktur Proyek

```
ai/
├── 🌐 WEB VERSION (HTML, CSS, JS)
│   ├── start.html              # 🚀 HUB NAVIGASI (MULAI DARI SINI!)
│   ├── index.html              # 💬 Web Chat - Versi Dasar
│   ├── style.css               # 🎨 Styling untuk versi dasar
│   ├── app.js                  # ⚙️ Logic untuk versi dasar
│   ├── advanced.html           # 🚀 Web Chat - Versi Advanced
│   ├── style-advanced.css      # 🎨 Styling untuk versi advanced
│   ├── advanced.js             # ⚙️ Logic untuk versi advanced
│   └── WEB_GUIDE.md            # 📖 Dokumentasi web version
│
├── 🐍 PYTHON VERSION (CLI)
│   ├── ai_app.py               # 💬 CLI Chat - Versi Dasar
│   ├── ai_advanced.py          # 🚀 CLI Chat - Versi Advanced
│   ├── ai_utils.py             # 🛠️ Utility functions & AI classes
│   ├── test_key.py             # ✅ API Key testing script
│   ├── requirements.txt         # 📦 Python dependencies
│   ├── setup.bat               # ⚙️ Setup script Windows
│   ├── setup.sh                # ⚙️ Setup script Linux/Mac
│   ├── GUIDE.md                # 📖 Dokumentasi Python version
│   └── .env.example            # 📝 Template konfigurasi
│
└── 📚 DOKUMENTASI
    ├── README.md               # 📖 File ini
    ├── INDEX.md                # 📋 Index semua file
    └── WEB_GUIDE.md            # 🌐 Web version guide
```

## 🔧 Konfigurasi API Key

### Metode 1: File .env (Recommended)
```bash
# 1. Copy template
cp .env.example .env

# 2. Edit file .env
GOOGLE_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz...
```

### Metode 2: Environment Variable
```bash
# Windows (Command Prompt)
set GOOGLE_API_KEY=your_api_key_here

# Windows (PowerShell)
$env:GOOGLE_API_KEY="your_api_key_here"

# Linux/Mac
export GOOGLE_API_KEY="your_api_key_here"
```

### Metode 3: Direct dalam Kode
```python
# Hanya untuk testing - JANGAN commit ke git!
import google.genai as genai
genai.configure(api_key="your_api_key_here")
```

## 🎯 Cara Menggunakan

### Web Version
1. **Buka `start.html`** di browser
2. **Pilih versi** yang diinginkan
3. **Masukkan pertanyaan** di chat box
4. **Tekan Enter** atau klik Send
5. **AI akan merespons** secara real-time

### Python Version
```bash
# Versi Dasar
python ai_app.py

# Versi Advanced
python ai_advanced.py

# Test API Key
python test_key.py
```

### Contoh Penggunaan AI

#### Code Review
```
Input: "Review kode Python ini: def hello(): print('Hello')"
Output: Analisis mendalam + saran improvement
```

#### Content Generation
```
Input: "Buat artikel tentang AI untuk pemula"
Output: Artikel lengkap dengan struktur yang baik
```

#### Brainstorming
```
Input: "Ide aplikasi mobile untuk mahasiswa"
Output: 10+ ide inovatif dengan penjelasan
```

## 🛠️ Troubleshooting

### ❌ "API Error" atau "Invalid API Key"
- ✅ Pastikan API key benar (copy paste ulang)
- ✅ Cek apakah ada spasi di awal/akhir
- ✅ Verifikasi di [Google AI Studio](https://makersuite.google.com/app/apikey)

### ❌ "Quota Exceeded" (429 Error)
- ⏰ Tunggu reset kuota (setiap 24 jam)
- 💰 Upgrade ke paid plan jika perlu lebih banyak requests
- 📊 Cek usage di [Google Cloud Console](https://console.cloud.google.com/)

### ❌ "Module not found" atau Import Error
```bash
# Install ulang dependencies
pip install -r requirements.txt

# Atau untuk Python 3 spesifik
pip3 install -r requirements.txt
```

### ❌ Web version tidak loading
- 🔄 Refresh browser (Ctrl+F5)
- 🌐 Pastikan koneksi internet stabil
- 🚫 Disable ad-blocker jika perlu

### ❌ Python version error
```bash
# Cek Python version
python --version

# Update pip
python -m pip install --upgrade pip

# Install dalam virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

## 🔒 Keamanan & Best Practices

### 🔐 API Key Security
- ❌ **JANGAN** commit `.env` ke Git
- ❌ **JANGAN** bagikan API key
- ❌ **JANGAN** hardcode API key dalam kode
- ✅ Gunakan `.env` file (sudah di `.gitignore`)
- ✅ Gunakan environment variables di production

### 📊 Rate Limits & Quotas
- **Free Tier**: 20 requests/hari per model
- **Monitoring**: Cek usage di Google Cloud Console
- **Optimization**: Cache responses jika memungkinkan

### 🛡️ Data Privacy
- Data Anda diproses oleh Google Gemini API
- Tidak ada data yang disimpan secara permanen
- Ikuti [Google's Privacy Policy](https://policies.google.com/privacy)

## 🤝 Contributing

Kami terbuka untuk kontribusi! Cara berkontribusi:

1. **Fork** repository ini
2. **Buat branch** baru: `git checkout -b feature/AmazingFeature`
3. **Commit changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push** ke branch: `git push origin feature/AmazingFeature`
5. **Buat Pull Request**

### Development Setup
```bash
# Clone repository
git clone https://github.com/yourusername/ai-assistant.git
cd ai-assistant

# Setup development environment
pip install -r requirements.txt
cp .env.example .env

# Run tests
python test_key.py
```

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- **Google Gemini AI** - Untuk AI capabilities yang powerful
- **Open Source Community** - Untuk libraries dan tools yang digunakan
- **Contributors** - Untuk kontribusi dan feedback

## 📞 Support & Contact

- 📧 **Email**: [your.email@example.com](mailto:your.email@example.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/ai-assistant/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-assistant/discussions)
- 📖 **Documentation**: [Wiki](https://github.com/yourusername/ai-assistant/wiki)

---

## 🎉 What's Next?

- [ ] **Multi-language Support** - Bahasa Indonesia, English, etc.
- [ ] **Voice Input/Output** - Speech-to-text dan text-to-speech
- [ ] **File Upload** - Analyze documents, images, PDFs
- [ ] **Custom Models** - Fine-tuned models untuk domain spesifik
- [ ] **API Endpoints** - REST API untuk integrasi
- [ ] **Mobile App** - React Native atau Flutter version

**⭐ Jika project ini bermanfaat, jangan lupa kasih star di GitHub!**

---

*Built with ❤️ by Muhammad Dani Sahputra* | *Powered by Google Gemini AI*
2. Ketik pertanyaan atau perintah Anda
3. AI akan memberikan jawaban
4. Ketik `keluar` atau `exit` untuk berhenti

## 📝 Contoh Pertanyaan

- "Jelaskan tentang machine learning"
- "Buatkan script Python untuk menghitung faktorial"
- "Apa perbedaan antara AI dan Machine Learning?"
- "Bagaimana cara belajar programming?"

## 🔧 Kustomisasi

Edit `ai_app.py` untuk:
- Mengganti model (misal: `gemini-pro-vision` untuk gambar)
- Menambah fitur baru
- Mengubah behavior AI

## 📚 Model Tersedia

- `gemini-pro` - Model terbaik untuk text
- `gemini-pro-vision` - Untuk analisis gambar
- `embedding-001` - Untuk embeddings

## 🐛 Troubleshooting

**Error: "API Key tidak valid"**
- Pastikan API key sudah benar
- Regenerasi API key di makersuite.google.com

**Error: "Rate limit exceeded"**
- Tunggu beberapa saat sebelum request berikutnya
- Google punya rate limit untuk free tier

**Error: "Import error"**
```bash
pip install --upgrade google-generativeai
```

## 📖 Link Berguna

- Dokumentasi: https://ai.google.dev
- API Reference: https://ai.google.dev/api
- Get API Key: https://makersuite.google.com/app/apikey

## 💡 Tips

1. Gunakan prompt yang jelas dan spesifik
2. Untuk hasil yang lebih baik, berikan konteks
3. Bisa digunakan untuk berbagai tugas (coding, writing, brainstorming, dll)
4. Gratis untuk penggunaan development!

---

**Dibuat dengan ❤️ menggunakan Google Generative AI**

**Copyright (c) 2026 Muhammad Dani Sahputra. All rights reserved.**
