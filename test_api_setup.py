#!/usr/bin/env python
"""
API Connection Tester - Verify Google Generative AI API works
"""

import os
import sys
from dotenv import load_dotenv

# Load .env
load_dotenv()

print("=" * 70)
print("🧪 TESTING GOOGLE GENERATIVE AI API CONNECTION")
print("=" * 70)

# Step 1: Check API Key
print("\n[STEP 1] Checking API Key...")
print("-" * 70)

api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    print("❌ ERROR: GOOGLE_API_KEY not found in .env")
    print("   Solution: Add GOOGLE_API_KEY=your_key to .env file")
    sys.exit(1)

if api_key.startswith("your_"):
    print("❌ ERROR: GOOGLE_API_KEY is still placeholder")
    print("   Current value:", api_key)
    print("   Get real key from: https://aistudio.google.com/app/apikey")
    sys.exit(1)

if len(api_key) < 30:
    print(f"⚠️  WARNING: API Key seems too short ({len(api_key)} chars)")
    print("   Most valid keys are 40+ characters")

print("✓ API Key found")
print(f"✓ Length: {len(api_key)} characters")
print(f"✓ Starts with: {api_key[:10]}...{api_key[-5:]}")

# Step 2: Test import
print("\n[STEP 2] Testing module imports...")
print("-" * 70)

try:
    import google.genai as genai
    print("✓ google.genai module imported")
except ImportError as e:
    print(f"❌ ERROR: Cannot import google.genai")
    print(f"   Error: {e}")
    print("   Solution: pip install google-generativeai")
    sys.exit(1)

try:
    from ai_utils import SpecializedAI, ContentCleaner
    print("✓ ai_utils modules imported")
except ImportError as e:
    print(f"❌ ERROR: Cannot import ai_utils")
    print(f"   Error: {e}")
    sys.exit(1)

# Step 3: Initialize AI
print("\n[STEP 3] Initializing SpecializedAI...")
print("-" * 70)

try:
    ai = SpecializedAI()
    print("✓ SpecializedAI initialized successfully")
except ValueError as e:
    print(f"❌ ERROR: Cannot initialize AI")
    print(f"   Error: {e}")
    print("   This might mean invalid API key")
    sys.exit(1)
except Exception as e:
    print(f"❌ ERROR: Unexpected error")
    print(f"   Error: {e}")
    sys.exit(1)

# Step 4: Test API Call
print("\n[STEP 4] Testing API call (simple prompt)...")
print("-" * 70)

try:
    response = ai.client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say 'API Working Successfully!' in exactly these words."
    )
    
    print("✓ API call successful!")
    print(f"✓ Response: {response.text[:100]}...")
    
except Exception as e:
    print(f"❌ ERROR: API call failed")
    print(f"   Error: {str(e)[:200]}")
    print("\n   Possible causes:")
    print("   • Invalid API key")
    print("   • API not enabled in Google Cloud")
    print("   • Network connectivity issue")
    print("   • Rate limit exceeded")
    sys.exit(1)

# Step 5: Test ContentCleaner
print("\n[STEP 5] Testing ContentCleaner...")
print("-" * 70)

try:
    # Test clean_text
    text = ContentCleaner.clean_text("Hello    world\n\n\ntest")
    assert text == "Hello world test", "clean_text failed"
    print("✓ clean_text() works")
    
    # Test detect_language
    lang = ContentCleaner.detect_language("def hello():\n    return 42")
    assert lang == "python", "detect_language failed"
    print("✓ detect_language() works")
    
    # Test clean_code
    code = ContentCleaner.clean_code("```python\ndef test():\n    pass\n```")
    assert code['language'] == 'python', "clean_code failed"
    print("✓ clean_code() works")
    
    # Test clean_ai_response
    resp = ContentCleaner.clean_ai_response("Text\n```python\ndef x():\n    pass\n```")
    assert resp['has_code'], "clean_ai_response failed"
    print("✓ clean_ai_response() works")
    
except AssertionError as e:
    print(f"❌ ERROR: ContentCleaner test failed")
    print(f"   Error: {e}")
    sys.exit(1)

# Final Summary
print("\n" + "=" * 70)
print("✅ ALL TESTS PASSED!")
print("=" * 70)

print("\n📊 Summary:")
print("  ✓ API Key valid and configured")
print("  ✓ Modules imported successfully")
print("  ✓ SpecializedAI initialized")
print("  ✓ API connection working")
print("  ✓ ContentCleaner functional")

print("\n🎉 Ready to use!")
print("\nNext steps:")
print("  1. Open advanced.html in browser")
print("  2. Input API key in setup form")
print("  3. Click Setup button")
print("  4. Start chatting with AI!")

print("\n" + "=" * 70)
