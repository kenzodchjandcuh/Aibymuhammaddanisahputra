/**
 * AI Assistant Web Application
 * Copyright (c) 2026 Muhammad Dani Sahputra
 * All rights reserved.
 * 
 * Powered by Google Generative AI
 */

// Konfigurasi Global
const CONFIG = {
    apiKey: null,
    model: null,
    isSetup: false,
};

// DOM Elements
const elements = {
    apiKeyInput: document.getElementById('apiKeyInput'),
    setupBtn: document.getElementById('setupBtn'),
    userInput: document.getElementById('userInput'),
    sendBtn: document.getElementById('sendBtn'),
    clearBtn: document.getElementById('clearBtn'),
    chatMessages: document.getElementById('chatMessages'),
    loading: document.getElementById('loading'),
    apiKeySection: document.getElementById('apiKeySection'),
    querySection: document.getElementById('querySection'),
    status: document.getElementById('status'),
    messageCount: document.getElementById('messageCount'),
};

// State
let conversationHistory = [];

// ===== Setup Functions =====
elements.setupBtn.addEventListener('click', setupAPI);
elements.sendBtn.addEventListener('click', sendMessage);
elements.clearBtn.addEventListener('click', clearChat);
elements.userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function setupAPI() {
    const apiKey = elements.apiKeyInput.value.trim();

    if (!apiKey) {
        showError('⚠️ Silakan masukkan API Key terlebih dahulu');
        return;
    }

    try {
        // Test API Key dengan REST API
        const testResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: 'Halo' }]
                }]
            })
        });

        if (!testResponse.ok) {
            throw new Error(`API Error: ${testResponse.statusText}`);
        }

        const data = await testResponse.json();
        
        if (data.candidates && data.candidates[0]) {
            CONFIG.apiKey = apiKey;
            CONFIG.isSetup = true;
            
            // Save to localStorage
            localStorage.setItem('gemini_api_key', apiKey);
            
            // Update UI
            elements.apiKeySection.style.display = 'none';
            elements.querySection.style.display = 'flex';
            elements.status.textContent = '✅ Aktif';
            elements.userInput.focus();
            
            showSuccess('🎉 Setup Berhasil! AI siap digunakan');
        }
    } catch (error) {
        showError(`❌ Gagal setup: ${error.message}`);
        console.error(error);
    }
}

// ===== Chat Functions =====
async function sendMessage() {
    const message = elements.userInput.value.trim();

    if (!message) return;

    if (!CONFIG.isSetup) {
        showError('⚠️ Silakan setup API Key terlebih dahulu');
        return;
    }

    // Add user message to UI
    addMessage(message, 'user');
    elements.userInput.value = '';

    // Show loading
    elements.loading.style.display = 'flex';

    try {
        // Send to AI via REST API
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + CONFIG.apiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        // Add AI response to UI
        addMessage(aiResponse, 'ai');

        // Save to history
        conversationHistory.push({
            timestamp: new Date().toISOString(),
            user: message,
            ai: aiResponse,
        });

        // Update message count
        updateMessageCount();

    } catch (error) {
        showError(`❌ Error: ${error.message}`);
        console.error(error);
    } finally {
        elements.loading.style.display = 'none';
        elements.userInput.focus();
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    elements.chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function showError(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message error';
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    elements.chatMessages.appendChild(messageDiv);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function showSuccess(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message success';
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    elements.chatMessages.appendChild(messageDiv);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function clearChat() {
    if (confirm('🗑️ Hapus semua chat? Tindakan ini tidak bisa dibatalkan.')) {
        conversationHistory = [];
        elements.chatMessages.innerHTML = `
            <div class="message welcome">
                <div class="message-content">
                    <h3>Chat Dihapus ✨</h3>
                    <p>Mulai percakapan baru!</p>
                </div>
            </div>
        `;
        updateMessageCount();
    }
}

function updateMessageCount() {
    elements.messageCount.textContent = conversationHistory.length;
}

// ===== Initialization =====
function init() {
    // Cek localStorage untuk API key
    const savedApiKey = localStorage.getItem('gemini_api_key');
    
    if (savedApiKey) {
        elements.apiKeyInput.value = savedApiKey;
        // Auto setup jika ada API key tersimpan
        setupAPI();
    } else {
        elements.apiKeyInput.focus();
    }

    console.log('✅ AI Assistant initialized');
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);
