@echo off
REM Quick Start Setup Script untuk Windows

echo.
echo ========================================================
echo  ⚙️  SETUP APLIKASI AI DENGAN GOOGLE GEMINI
echo ========================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python belum terinstall!
    echo Silakan download di: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo ✅ Python ditemukan
echo.

REM Install requirements
echo 📦 Menginstall dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Error saat install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies terinstall dengan sukses!
echo.

REM Create .env file
echo 🔑 Setup API Key...
if not exist .env (
    copy .env.example .env >nul
    echo.
    echo ⚠️  File .env sudah dibuat!
    echo.
    echo 📝 Silakan:
    echo    1. Buka file .env dengan text editor
    echo    2. Dapatkan API key dari: https://makersuite.google.com/app/apikey
    echo    3. Ganti YOUR_API_KEY_HERE dengan API key Anda
    echo.
) else (
    echo ✅ File .env sudah ada
)

echo.
echo ========================================================
echo  🚀 SETUP SELESAI!
echo ========================================================
echo.
echo Cara menjalankan:
echo.
echo  1️⃣  Chat Interaktif Sederhana:
echo     python ai_app.py
echo.
echo  2️⃣  Chat dengan Fitur Advanced:
echo     python ai_advanced.py
echo.
echo  3️⃣  Gunakan Utility Khusus:
echo     python ai_utils.py
echo.
echo ========================================================
echo.
pause
