#!/bin/bash

# Quick Start Setup Script untuk Linux/Mac

echo ""
echo "========================================================"
echo "  ⚙️  SETUP APLIKASI AI DENGAN GOOGLE GEMINI"
echo "========================================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python belum terinstall!"
    echo "Silakan install Python 3 terlebih dahulu"
    exit 1
fi

echo "✅ Python ditemukan: $(python3 --version)"
echo ""

# Install requirements
echo "📦 Menginstall dependencies..."
pip3 install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Error saat install dependencies"
    exit 1
fi

echo "✅ Dependencies terinstall dengan sukses!"
echo ""

# Create .env file
echo "🔑 Setup API Key..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo ""
    echo "⚠️  File .env sudah dibuat!"
    echo ""
    echo "📝 Silakan:"
    echo "   1. Buka file .env dengan text editor"
    echo "   2. Dapatkan API key dari: https://makersuite.google.com/app/apikey"
    echo "   3. Ganti YOUR_API_KEY_HERE dengan API key Anda"
    echo ""
else
    echo "✅ File .env sudah ada"
fi

echo ""
echo "========================================================"
echo "  🚀 SETUP SELESAI!"
echo "========================================================"
echo ""
echo "Cara menjalankan:"
echo ""
echo "  1️⃣  Chat Interaktif Sederhana:"
echo "      python3 ai_app.py"
echo ""
echo "  2️⃣  Chat dengan Fitur Advanced:"
echo "      python3 ai_advanced.py"
echo ""
echo "  3️⃣  Gunakan Utility Khusus:"
echo "      python3 ai_utils.py"
echo ""
echo "========================================================"
echo ""
