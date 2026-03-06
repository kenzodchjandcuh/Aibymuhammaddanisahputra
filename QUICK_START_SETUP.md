# 🚀 QUICK START - Setup API & Mulai Chat

**Status:** ⚠️ API Key belum dikonfigurasi

---

## 📋 RINGKAS: Kapan setup berhasil?

**Saat ini:**
```
❌ test_api_setup.py error: "GOOGLE_API_KEY is still placeholder"
❌ .env file hanya punya: your_api_key_here
❌ Browser setup form belum diisi
```

**Yang dibutuhkan:**
✅ Valid API Key dari Google  
✅ Input di form advanced.html  
✅ Click Setup button  

---

## 🎯 3 CARA SETUP (Pilih 1)

---

### **CARA 1: Browser UI (PALING MUDAH)** ⭐ RECOMMENDED

**Step 1: Dapatkan API Key**
1. Buka: **https://aistudio.google.com/app/apikey**
2. Login dengan Google account
3. Klik **"Create API Key"**
4. **COPY** API key yang muncul
   - Contoh: `AIzaSyD_abcdefg1234567890...`

**Step 2: Input ke Browser**
1. Buka file: `advanced.html`
   - Di browser: File > Open > advanced.html
   - Atau: Drag advanced.html ke tab browser

2. Akan lihat screen:
```
┌──────────────────────────────────────┐
│  🤖 AI Assistant Advanced            │
│                                      │
│  API Key Setup:                      │
│  ┌──────────────────────────────┐   │
│  │ [Paste API Key Here]         │   │
│  └──────────────────────────────┘   │
│                                      │
│         [ Setup Button ]             │
│                                      │
│  ⚠️ Status: Not connected            │
└──────────────────────────────────────┘
```

3. **PASTE** API key ke input field:
   - Klik di field
   - Ctrl+V (paste)

4. Klik **Setup** button

5. **TUNGGU 1-2 detik**, akan muncul:
```
✅ "Setup Berhasil!"
✅ Chat interface terbuka
✅ Status: "Connected"
```

**Done! Sekarang bisa chat langsung** 🎉

---

### **CARA 2: Via Python (.env file)**

**Step 1: Edit .env**

File: `e:\gabutnyasaya.html\ai\.env`

**SEBELUM:**
```
GOOGLE_API_KEY=your_api_key_here
```

**SESUDAH:**
```
GOOGLE_API_KEY=AIzaSyD_1234567890abcdefghijklmnopqrs
```

**Step 2: Test Python**

```bash
cd e:\gabutnyasaya.html\ai
python test_api_setup.py
```

Expected output:
```
✅ ALL TESTS PASSED!
✓ API Key valid and configured
✓ API connection working
✓ Ready to use!
```

**Step 3: Test Browser**

- Buka advanced.html
- API key sudah auto-loaded dari Python
- Setup button siap diklik

---

### **CARA 3: Hardcode (UNTUK DEVELOPMENT SAJA)**

⚠️ **JANGAN PAKAI DI PRODUCTION - NOT SECURE!**

Edit: `advanced.js` (line ~45)

**SEBELUM:**
```javascript
const CONFIG = {
    apiKey: null,
```

**SESUDAH:**
```javascript
const CONFIG = {
    apiKey: 'AIzaSyD_your_actual_key_here',
    isSetup: true,  // Skip setup screen
```

---

## ✅ VERIFY SETUP BERHASIL

Setelah setup, pastikan:

| Check | Berhasil | Gagal |
|-------|----------|-------|
| Browser console (F12) | No errors | Red error |
| Chat input visible | ✓ Textarea muncul | ✗ Hidden |
| Status indicator | ✓ "✅ Connected" | ✗ "❌ Not connected" |
| Send message | ✓ Bisa kirim | ✗ Disabled |
| AI respond | ✓ Response muncul | ✗ Timeout/error |

---

## 🔍 DEBUG: Jika Masih Error

### Check 1: API Key Format
```
✓ Harus dimulai dengan: AIzaSy
✓ Panjang: minimal 39 character
✓ Tidak ada spasi di awal/akhir

❌ Jika error "Invalid key format"
   → Copy ulang dari aistudio.google.com
```

### Check 2: Browser Console (F12)
```
Tekan F12 > Console
Cari red error messages
Contoh:
- "API key not valid" → re-verify key
- "CORS error" → reload page
- "Network error" → check internet
```

### Check 3: Network
```
✓ Internet connection on
✓ No VPN/proxy blocking Google
✓ Firewall allow generativelanguage.googleapis.com
✓ Not behind corporate firewall

Test: ping generativelanguage.googleapis.com
```

### Check 4: API Key Status in Google Cloud
```
1. Go: https://console.cloud.google.com
2. Select project yang sama
3. Verify: "Generative Language API" is ENABLED
4. Verify: API key not revoked/expired
```

---

## 📊 FLOWCHART: Setup Process

```
START
  ↓
[Get API Key from aistudio.google.com]
  ↓
[Open advanced.html in browser]
  ↓
[Paste API Key in form]
  ↓
[Click Setup button]
  ↓
  ├─ SUCCESS ──→ ✅ Chat Interface Opens
  │              ├─ Status: "✅ Connected"
  │              ├─ Input field active
  │              └─ Ready to chat!
  │
  └─ ERROR ───→ ❌ Error message shown
               ├─ Check Console (F12)
               ├─ Verify API key
               ├─ Try again
               └─ If still error → See DEBUG section
```

---

## 🎯 NEXT STEPS (After Setup)

1. ✅ Type message di input field
2. ✅ Press Ctrl+Enter atau click Send
3. ✅ AI respond dengan ContentCleaner:
   - ✅ Text dibersihkan (extra whitespace removed)
   - ✅ Code blocks ditampilkan rapi
   - ✅ Language badge di code
   - ✅ Copy button untuk code

Contoh AI Response:
```
USER: "Write hello world in Python"

AI RESPONSE:
"Here's a simple hello world program:

📝 PYTHON
[Copy Button]

def hello():
    print("Hello, World!")

hello()

This code defines a function and calls it."
```

---

## 🆘 MASIH ERROR? DO THIS NOW

### Option A: Reset Everything
```
1. Close browser completely
2. Clear browser cache (Ctrl+Shift+Delete)
3. Delete localStorage:
   - Chrome DevTools > Application > Local Storage > Delete All
4. Reopen advanced.html
5. Fresh setup dengan API key baru
```

### Option B: Test via Python First
```
1. Update .env dengan API key valid
2. Run: python test_api_setup.py
3. Jika green ✓ → Python side OK
4. Then try browser setup
```

### Option C: Verify Google Cloud Setup
```
1. Go: https://console.cloud.google.com
2. Verify project selected
3. Enable "Generative Language API"
4. Create new API key
5. Try again dengan key baru
```

---

## 📞 GETTING HELP

**Error Message:** [Paste exact error dari F12 console]

**System Info:**
- Browser: [Chrome/Firefox/Edge/Safari]
- OS: Windows/Mac/Linux
- Node version: `node --version`
- Python version: `python --version`

**Checked:**
- [ ] API key dari official source
- [ ] No spaces in API key
- [ ] Browser F12 console checked
- [ ] Internet connection OK
- [ ] Advanced.html opened (not text editor)

---

## ✨ SUCCESS CHECKLIST

Jika semua ✓ setup pasti berhasil:

□ API key obtained from aistudio.google.com  
□ API key copied completely (no spaces)  
□ advanced.html opened in browser (not editor)  
□ API key pasted in form  
□ Setup button clicked  
□ No error in F12 console  
□ Chat interface visible  
□ Send message + AI responds  

**Semuanya ✓ = SETUP BERHASIL!** 🎉

---

## 🚀 READY?

**GET API KEY:** https://aistudio.google.com/app/apikey

**SETUP NOW:** Open `advanced.html` in browser

**CHAT:** Type message and enjoy! 💬

---

*Last Updated: 6 Maret 2026*  
*For detailed troubleshooting: See API_SETUP_TROUBLESHOOTING.txt*
