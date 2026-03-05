"""
AI Assistant Advanced CLI Application
Copyright (c) 2026 Muhammad Dani Sahputra
All rights reserved.

Powered by Google Generative AI
"""

import google.generativeai as genai
import os
import json
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

# Load .env file
load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY")
MODEL_NAME = os.getenv("AI_MODEL", "gemini-2.5-flash")

class AIAssistant:
    """Class untuk AI Assistant dengan fitur advanced"""
    
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GOOGLE_API_KEY")
        if not self.api_key or self.api_key.startswith("YOUR_"):
            raise ValueError("⚠️ GOOGLE_API_KEY belum dikonfigurasi!")
        
        genai.configure(api_key=self.api_key)
        self.model = MODEL_NAME
        self.conversation_history = []
        self.chat_history_file = "chat_history.json"
        
    def save_conversation(self):
        """Simpan conversation history ke file JSON"""
        try:
            with open(self.chat_history_file, 'w', encoding='utf-8') as f:
                json.dump(self.conversation_history, f, ensure_ascii=False, indent=2)
            print(f"✅ Conversation disimpan ke {self.chat_history_file}")
        except Exception as e:
            print(f"❌ Error menyimpan conversation: {e}")
    
    def load_conversation(self):
        """Muat conversation history dari file JSON"""
        try:
            if Path(self.chat_history_file).exists():
                with open(self.chat_history_file, 'r', encoding='utf-8') as f:
                    self.conversation_history = json.load(f)
                print(f"✅ Conversation loaded ({len(self.conversation_history)} messages)")
        except Exception as e:
            print(f"⚠️ Tidak bisa load conversation: {e}")
    
    def ask(self, prompt, system_prompt=None):
        """
        Tanya AI dengan optional system prompt
        
        Args:
            prompt: Pertanyaan user
            system_prompt: Instruksi sistem (opsional)
        
        Returns:
            Jawaban dari AI
        """
        try:
            # Gabung system prompt dengan user prompt jika ada
            if system_prompt:
                full_prompt = f"{system_prompt}\n\n{prompt}"
            else:
                full_prompt = prompt
            
            resp = genai.generate_text(model=self.model, prompt=full_prompt)
            answer = _extract_text(resp)

            # Simpan ke history
            self.conversation_history.append({
                "timestamp": datetime.now().isoformat(),
                "user": prompt,
                "ai": answer
            })

            return answer
        
        except Exception as e:
            error_msg = f"Error: {str(e)}"
            print(f"❌ {error_msg}")
            return error_msg
    
    def ask_with_memory(self, prompt):
        """
        Tanya dengan mengingat conversation history
        (Context-aware conversation)
        """
        try:
            # Buat konteks dari conversation history
            context = "Conversation history:\n"
            for i, msg in enumerate(self.conversation_history[-5:]):  # Last 5 messages
                context += f"\nUser: {msg['user']}\nAI: {msg['ai']}\n"
            
            full_prompt = f"{context}\nUser: {prompt}"
            resp = genai.generate_text(model=self.model, prompt=full_prompt)
            answer = _extract_text(resp)

            self.conversation_history.append({
                "timestamp": datetime.now().isoformat(),
                "user": prompt,
                "ai": answer
            })

            return answer
        
        except Exception as e:
            return f"Error: {str(e)}"
    
    def interactive_chat(self):
        """Chat interaktif dengan fitur lengkap"""
        print("\n" + "=" * 70)
        print("🤖 AI ASSISTANT - INTERACTIVE CHAT")
        print("=" * 70)
        print("Commands:")
        print("  /save   - Simpan conversation")
        print("  /clear  - Hapus conversation baru")
        print("  /show   - Tampilkan conversation history")
        print("  /help   - Bantuan")
        print("  /exit   - Keluar")
        print("-" * 70)
        
        self.load_conversation()
        
        while True:
            try:
                user_input = input("\n👤 You: ").strip()
                
                if not user_input:
                    continue
                
                # Command handling
                if user_input.startswith('/'):
                    self._handle_command(user_input)
                    continue
                
                # Regular query
                print("⏳ AI sedang berpikir...", end="", flush=True)
                response = self.ask_with_memory(user_input)
                print("\r" + " " * 30 + "\r", end="")
                print(f"🤖 AI: {response}")
                
            except KeyboardInterrupt:
                print("\n\n👋 Program dihentikan oleh user")
                break
            except Exception as e:
                print(f"❌ Error: {e}")
    
    def _handle_command(self, command):
        """Handle special commands"""
        cmd = command.lower().strip('/')
        
        if cmd == 'save':
            self.save_conversation()
        elif cmd == 'clear':
            self.conversation_history = []
            print("✅ Conversation history dihapus")
        elif cmd == 'show':
            self._show_history()
        elif cmd == 'help':
            print("\n📚 HELP:")
            print("  /save   - Simpan ke file")
            print("  /clear  - Hapus history")
            print("  /show   - Lihat history")
            print("  /exit   - Keluar")
        elif cmd == 'exit':
            print("💾 Menyimpan conversation...")
            self.save_conversation()
            print("👋 Terima kasih!")
            exit()
        else:
            print("❓ Command tidak dikenal. Ketik /help")
    
    def _show_history(self):
        """Tampilkan conversation history"""
        if not self.conversation_history:
            print("📭 Tidak ada conversation history")
            return
        
        print("\n" + "=" * 70)
        print("📜 CONVERSATION HISTORY")
        print("=" * 70)
        
        for i, msg in enumerate(self.conversation_history, 1):
            print(f"\n[{i}] {msg.get('timestamp', 'Unknown time')}")
            print(f"👤 You: {msg['user'][:100]}...")
            print(f"🤖 AI: {msg['ai'][:100]}...")
        
        print("\n" + "=" * 70)

# Example usage
if __name__ == "__main__":
    try:
        assistant = AIAssistant()
        assistant.interactive_chat()
    except ValueError as e:
        print(f"❌ {e}")
        print("\n📖 Panduan setup:")
        print("1. Dapatkan API key dari: https://makersuite.google.com/app/apikey")
        print("2. Set environment variable: set GOOGLE_API_KEY=your_key")
        print("3. Run file ini kembali")
