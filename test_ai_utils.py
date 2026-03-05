#!/usr/bin/env python3
"""Test script for ai_utils.py"""

from ai_utils import SpecializedAI

def test_ai_utils():
    try:
        print("🔄 Initializing AI...")
        ai = SpecializedAI()
        print("✅ AI initialized successfully")

        print("\n🔄 Testing code reviewer...")
        test_code = 'def hello():\n    print("Hello World")\n    return True'
        result = ai.code_reviewer(test_code)
        print("✅ Code review completed")
        print(f"📝 Result preview: {result[:150]}..." if len(result) > 150 else f"📝 Result: {result}")

        print("\n🎉 All tests passed!")

    except Exception as e:
        print(f"❌ Error: {e}")
        return False

    return True

if __name__ == "__main__":
    test_ai_utils()