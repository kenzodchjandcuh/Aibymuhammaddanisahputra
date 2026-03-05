# 🌐 AI Assistant - Web Version (HTML, CSS, JS)

Versi web dari aplikasi AI yang menggunakan **Google Generative AI (Gemini)** dengan antarmuka yang indah dan responsive.

## 📁 File yang Tersedia

### Versi Dasar (Simple)
- **index.html** - Interface chat sederhana
- **style.css** - Styling untuk versi dasar
- **app.js** - Logic untuk versi dasar

### Versi Advanced
- **advanced.html** - Interface dengan sidebar + features lengkap
- **style-advanced.css** - Styling untuk versi advanced
- **advanced.js** - Logic untuk versi advanced

## 🚀 Quick Start

### 1. Dapatkan API Key
1. Buka: https://makersuite.google.com/app/apikey
2. Klik "Create API Key"
3. Copy API key

### 2. Jalankan Aplikasi

**Versi Dasar:**
```bash
# Buka file index.html di browser
# Atau double-click folder ai, kemudian buka index.html
```

**Versi Advanced:**
```bash
# Buka file advanced.html di browser
# Atau double-click folder ai, kemudian buka advanced.html
```

### 3. Setup API Key
1. Paste API key ke input field
2. Klik tombol "Setup" atau "Start"
3. Siap menggunakan AI!

## 🎯 Fitur Versi Dasar (index.html)

✅ Chat interaktif real-time  
✅ Interface yang clean dan modern  
✅ Dark mode theme  
✅ Responsive design  
✅ Local storage untuk API key  
✅ Message counter  

**Cara Pakai:**
1. Buka `index.html` di browser
2. Masukkan API Key Google
3. Klik "Setup"
4. Mulai chat!

## 🎯 Fitur Versi Advanced (advanced.html)

✅ Semua fitur versi dasar  
✅ Sidebar conversation history  
✅ Simpan multiple conversations  
✅ Export conversations ke JSON  
✅ Settings panel (temperature, max tokens, system prompt)  
✅ Quick commands  
✅ Real-time response time  
✅ Status indicator  
✅ Auto-save option  

**Cara Pakai:**
1. Buka `advanced.html` di browser
2. Masukkan API Key Google
3. Klik "Start"
4. Create new chat atau pilih dari history
5. Ketik pertanyaan dan tekan Ctrl+Enter atau klik Send

## 📚 Penggunaan

### Mengirim Pesan

**Di index.html (Versi Dasar):**
- Ketik pertanyaan
- Tekan Enter atau klik tombol "Kirim"

**Di advanced.html (Versi Advanced):**
- Ketik pertanyaan
- Tekan Ctrl+Enter atau klik tombol "Send"

### Commands dalam Advanced Version

**Sidebar:**
- "+ New Chat" - Buat percakapan baru
- Click pada conversation - Load conversation lama

**Header Buttons:**
- ⚙️ Settings - Buka pengaturan
- 📥 Export - Download conversations as JSON
- 🌙 Dark/Light - Toggle dark mode

### Quick Commands

Di welcome message ada beberapa quick command:
- 📚 Python Basics
- 💻 Code Help
- 🚀 Productivity

Klik salah satu untuk auto-fill pertanyaan.

## ⚙️ Settings (Advanced Version)

### Temperature (Kreativitas AI)
- Range: 0 - 1
- 0 = deterministik, jawaban sama
- 1 = kreatif, jawaban berbeda-beda
- Default: 0.7

### Max Tokens
- Batasan panjang respons AI
- Default: 2048

### System Prompt
- Instruksi khusus untuk AI
- Contoh: "Anda adalah coding expert yang helpful"

### Auto Save
- Otomatis simpan conversations
- Dihidupkan by default

## 💾 Local Storage

Aplikasi menyimpan data secara lokal:
- ✅ API Key (tersimpan di browser)
- ✅ Conversation history
- ✅ Settings & preferences

**Catatan:** Data tidak dikirim ke server, semuanya disimpan lokal di browser Anda.

## 📤 Export Conversations

Di advanced.html, klik tombol "📥 Export" untuk:
1. Download semua conversations dalam format JSON
2. Bisa di-import di device lain atau disimpan sebagai backup

## 🔒 Keamanan

⚠️ **Penting:**
- Jangan share API key di public repo
- API key tersimpan di Browser localStorage (aman lokal, tapi berhati-hati kalau sharing device)
- Hapus dari browser jika menggunakan public computer

## 🌍 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |
| Mobile | ✅ |

## 📱 Responsive Design

Aplikasi bekerja sempurna di:
- ✅ Desktop (1920x1080 dan lebih besar)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iPhone, Android phones)

## 🐛 Troubleshooting

### "API Key tidak valid"
1. Cek kembali API key di makersuite.google.com
2. Pastikan tidak ada spasi atau karakter extra
3. Regenerasi API key baru

### "CORS Error atau No module named..."
- Ini adalah JavaScript untuk browser, bukan Python
- Tidak perlu install apa-apa
- Cukup buka file HTML di browser

### "Respon AI lambat"
- Normal untuk free tier Google
- Tunggu beberapa saat
- Coba pertanyaan yang lebih simpel

### "Chat tidak tersimpan"
- Pastikan browser memungkinkan localStorage
- Chrome: Settings > Privacy > Cookies > Allow
- Private/Incognito mode: localStorage reset saat ditutup

## 🎨 Customization

### Ubah Warna Tema

Edit file CSS (style.css atau style-advanced.css):

```css
:root {
    --primary-color: #667eea;      /* Warna utama */
    --secondary-color: #764ba2;    /* Warna sekunder */
    --bg-dark: #0f0f23;            /* Background gelap */
    --text-light: #eee;            /* Warna text */
}
```

### Custom Welcome Message

Di app.js atau advanced.js, cari "Selamat Datang" dan edit text-nya.

### Ubah Model AI

Cari baris:
```javascript
genAI.getGenerativeModel({ model: 'gemini-pro' })
```

Bisa diubah ke:
- `gemini-pro-vision` - Untuk analisis gambar
- Atau model lain yang tersedia

## 📊 Use Cases

1. **Coding Assistant** - Debugging, code review, konsultasi
2. **Content Writer** - Brainstorming, menulis artikel
3. **Learning Tutor** - Menjelaskan konsep, homework help
4. **Brainstorming** - Generate ideas untuk project
5. **Translation** - Terjemah text/code

## 🔗 Resources

- 📖 Google AI Docs: https://ai.google.dev
- 🔑 API Key: https://makersuite.google.com/app/apikey
- 💬 Community: https://discord.gg/google-ai

## 💡 Tips & Tricks

1. **Jangan lupa Ctrl+Enter** (advanced version) untuk mengirim dengan textarea
2. **Simpan important conversations** dengan export feature
3. **Gunakan system prompt** untuk customize behavior AI
4. **Experiment with temperature** untuk hasil yang berbeda
5. **Bisa offline** setelah setup, tapi butuh internet untuk AI response

## ❓ FAQ

**Q: Apakah gratis?**
A: Ya, Google Generative AI gratis untuk development dengan rate limit yang reasonable.

**Q: Apakah data saya aman?**
A: Iya, semua data tersimpan lokal di browser Anda. Tidak ada server yang store data.

**Q: Bisa offline?**
A: Tidak, butuh internet untuk komunikasi dengan Google AI.

**Q: Apakah bisa install di mobile?**
A: Bisa! Buka file HTML di browser mobile, tapi lebih enak di desktop.

**Q: Gimana caranya reset settings?**
A: Buka DevTools (F12) > Application > Clear storage, atau import fresh .json file.

---

**Copyright (c) 2026 Muhammad Dani Sahputra. All rights reserved.**

**Selamat menggunakan Web AI Assistant! 🚀**

Kalau ada pertanyaan atau bug, cek browser console (F12) untuk error message.
