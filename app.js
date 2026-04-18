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
    fileInput: document.getElementById('fileInput'),
    filePreview: document.getElementById('filePreview'),
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
let attachedFiles = [];

// ===== Setup Functions =====
elements.setupBtn.addEventListener('click', setupAPI);
elements.sendBtn.addEventListener('click', sendMessage);
elements.clearBtn.addEventListener('click', clearChat);
elements.fileInput.addEventListener('change', handleFileSelection);
elements.userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function handleFileSelection() {
    attachedFiles = Array.from(elements.fileInput.files);
    renderFilePreview();
}

function renderFilePreview() {
    const preview = elements.filePreview;
    preview.innerHTML = '';

    if (!attachedFiles.length) {
        preview.innerHTML = '<p class="file-preview-empty">Tidak ada file terpilih.</p>';
        return;
    }

    attachedFiles.forEach(file => {
        const item = document.createElement('div');
        item.className = 'file-item';

        const icon = document.createElement('span');
        icon.className = 'file-icon';
        if (file.type.startsWith('image/')) {
            icon.textContent = '🖼️';
        } else if (file.type === 'application/pdf') {
            icon.textContent = '📄';
        } else {
            icon.textContent = '📁';
        }

        const label = document.createElement('div');
        label.className = 'file-label';
        label.innerHTML = `
            <strong>${file.name}</strong>
            <span>${file.type || 'Unknown'} · ${Math.round(file.size / 1024)} KB</span>
        `;

        item.appendChild(icon);
        item.appendChild(label);
        preview.appendChild(item);
    });
}

function getAttachmentDescription() {
    if (!attachedFiles.length) return '';
    return attachedFiles.map(file => `${file.name} (${file.type || 'file'}, ${Math.round(file.size / 1024)} KB)`).join(', ');
}

function clearFileSelection() {
    attachedFiles = [];
    elements.fileInput.value = '';
    renderFilePreview();
}

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
    const attachmentDescription = getAttachmentDescription();

    if (!message && !attachmentDescription) return;

    if (!CONFIG.isSetup) {
        showError('⚠️ Silakan setup API Key terlebih dahulu');
        return;
    }

    // Add user message to UI
    if (message) addMessage(message, 'user');
    if (attachmentDescription) addMessage(`📎 Lampiran: ${attachmentDescription}`, 'user');
    elements.userInput.value = '';

    // Show loading
    elements.loading.style.display = 'flex';

    try {
        const finalPrompt = attachmentDescription
            ? `${message}

[File terlampir: ${attachmentDescription}]

Tolong gunakan informasi lampiran di atas saat menjawab.`
            : message;

        // Send to AI via REST API
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + CONFIG.apiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: finalPrompt }]
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

        // Save to history
        conversationHistory.push({
            timestamp: new Date().toISOString(),
            user: message || `[Lampiran: ${attachmentDescription}]`,
            ai: aiResponse,
        });

        // Update message count
        updateMessageCount();
        clearFileSelection();

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
        clearFileSelection();
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
