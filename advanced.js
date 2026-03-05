/**
 * AI Assistant Advanced Web Application
 * Copyright (c) 2026 Muhammad Dani Sahputra
 * All rights reserved.
 * 
 * Powered by Google Generative AI
 */

// Configuration
const CONFIG = {
    apiKey: null,
    model: null,
    isSetup: false,
    temperature: 0.7,
    maxTokens: 2048,
    systemPrompt: '',
    autoSave: true,
};

// UI Elements
const elements = {
    apiKeyInput: document.getElementById('apiKeyInput'),
    setupBtn: document.getElementById('setupBtn'),
    userInput: document.getElementById('userInput'),
    sendBtn: document.getElementById('sendBtn'),
    chatMessages: document.getElementById('chatMessages'),
    apiSetup: document.getElementById('apiSetup'),
    chatInput: document.getElementById('chatInput'),
    conversationsList: document.getElementById('conversationsList'),
    newChatBtn: document.getElementById('newChatBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    exportBtn: document.getElementById('exportBtn'),
    darkModeBtn: document.getElementById('darkModeBtn'),
    settingsModal: document.getElementById('settingsModal'),
    saveSettingsBtn: document.getElementById('saveSettingsBtn'),
    temperatureSlider: document.getElementById('temperatureSlider'),
    tempValue: document.getElementById('tempValue'),
    maxTokens: document.getElementById('maxTokens'),
    systemPrompt: document.getElementById('systemPrompt'),
    autoSave: document.getElementById('autoSave'),
    connectionStatus: document.getElementById('connectionStatus'),
    tokenCount: document.getElementById('tokenCount'),
    responseTime: document.getElementById('responseTime'),
};

// State
let conversations = [];
let currentConversationId = null;
let startTime = 0;

// ===== Event Listeners =====
elements.setupBtn.addEventListener('click', setupAPI);
elements.sendBtn.addEventListener('click', sendMessage);
elements.userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        sendMessage();
    }
});

elements.newChatBtn.addEventListener('click', createNewChat);
elements.settingsBtn.addEventListener('click', () => openModal('settingsModal'));
elements.exportBtn.addEventListener('click', exportConversations);
elements.darkModeBtn.addEventListener('click', toggleDarkMode);
elements.saveSettingsBtn.addEventListener('click', saveSettings);

elements.temperatureSlider.addEventListener('input', (e) => {
    elements.tempValue.textContent = (e.target.value / 100).toFixed(2);
});

// ===== Setup & API =====
async function setupAPI() {
    const apiKey = elements.apiKeyInput.value.trim();

    if (!apiKey) {
        showError('⚠️ Silakan masukkan API Key');
        return;
    }

    try {
        // Test API with REST endpoint
        const testResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: 'test' }]
                }]
            })
        });

        if (!testResponse.ok) {
            throw new Error(`API Error: ${testResponse.statusText}`);
        }

        CONFIG.apiKey = apiKey;
        CONFIG.isSetup = true;

        localStorage.setItem('gemini_api_key', apiKey);

        elements.apiSetup.style.display = 'none';
        elements.chatInput.style.display = 'flex';
        updateStatus('✅ Connected', 'online');
        elements.userInput.focus();

        loadConversations();
        createNewChat();
        showSuccess('🎉 Setup Berhasil!');
    } catch (error) {
        showError(`❌ Setup failed: ${error.message}`);
        updateStatus('❌ Offline', 'offline');
    }
}

// ===== Chat Functions =====
async function sendMessage() {
    const message = elements.userInput.value.trim();

    if (!message || !CONFIG.isSetup) return;

    addMessage(message, 'user');
    elements.userInput.value = '';

    startTime = performance.now();

    try {
        let prompt = message;
        if (CONFIG.systemPrompt) {
            prompt = `${CONFIG.systemPrompt}\n\n${message}`;
        }

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + CONFIG.apiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);

        addMessage(aiResponse, 'ai');

        // Save to conversation
        if (currentConversationId) {
            const conv = conversations.find(c => c.id === currentConversationId);
            if (conv) {
                conv.messages.push({
                    timestamp: new Date().toISOString(),
                    user: message,
                    ai: aiResponse,
                });
                conv.lastUpdate = new Date().toISOString();
                
                if (CONFIG.autoSave) {
                    saveConversations();
                }
            }
        }

        elements.responseTime.textContent = `Response: ${responseTime}ms`;
        updateStatus('✅ Connected', 'online');

    } catch (error) {
        showError(`❌ Error: ${error.message}`);
        updateStatus('❌ Error', 'error');
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

    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function showError(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `<div class="message-content" style="background: rgba(231, 76, 60, 0.2); border: 1px solid #e74c3c; max-width: 70%;">${message}</div>`;
    elements.chatMessages.appendChild(messageDiv);
}

function showSuccess(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `<div class="message-content" style="background: rgba(46, 204, 113, 0.2); border: 1px solid #2ecc71; max-width: 70%;">${message}</div>`;
    elements.chatMessages.appendChild(messageDiv);
}

// ===== Conversation Management =====
function createNewChat() {
    const conversationId = Date.now().toString();
    conversations.push({
        id: conversationId,
        title: `Chat ${new Date().toLocaleString()}`,
        messages: [],
        lastUpdate: new Date().toISOString(),
    });

    currentConversationId = conversationId;
    clearChatMessages();
    renderConversationsList();
    saveConversations();
}

function clearChatMessages() {
    elements.chatMessages.innerHTML = `
        <div class="message welcome">
            <div class="message-content">
                <h3>Mulai Percakapan Baru 🎯</h3>
                <p>Tanyakan apa saja kepada AI!</p>
                <div class="quick-commands">
                    <button class="quick-btn" onclick="quickCommand('Jelaskan AI dan Machine Learning')">🤖 AI Basics</button>
                    <button class="quick-btn" onclick="quickCommand('Buatkan function JavaScript sort')">💻 Code</button>
                    <button class="quick-btn" onclick="quickCommand('Tips belajar efektif')">📚 Learning</button>
                </div>
            </div>
        </div>
    `;
}

function renderConversationsList() {
    elements.conversationsList.innerHTML = '';

    conversations.forEach(conv => {
        const item = document.createElement('div');
        item.className = `conversation-item ${conv.id === currentConversationId ? 'active' : ''}`;
        item.textContent = conv.title;
        item.onclick = () => loadConversation(conv.id);
        elements.conversationsList.appendChild(item);
    });
}

function loadConversation(conversationId) {
    currentConversationId = conversationId;
    const conv = conversations.find(c => c.id === conversationId);

    if (conv) {
        clearChatMessages();
        conv.messages.forEach(msg => {
            addMessage(msg.user, 'user');
            addMessage(msg.ai, 'ai');
        });
    }

    renderConversationsList();
}

function quickCommand(command) {
    elements.userInput.value = command;
    elements.userInput.focus();
}

// ===== Storage Functions =====
function saveConversations() {
    localStorage.setItem('conversations', JSON.stringify(conversations));
}

function loadConversations() {
    const saved = localStorage.getItem('conversations');
    if (saved) {
        conversations = JSON.parse(saved);
        renderConversationsList();
    }
}

function exportConversations() {
    const dataStr = JSON.stringify(conversations, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conversations-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// ===== Settings =====
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function saveSettings() {
    CONFIG.temperature = elements.temperatureSlider.value / 100;
    CONFIG.maxTokens = parseInt(elements.maxTokens.value);
    CONFIG.systemPrompt = elements.systemPrompt.value;
    CONFIG.autoSave = elements.autoSave.checked;

    localStorage.setItem('ai_config', JSON.stringify({
        temperature: CONFIG.temperature,
        maxTokens: CONFIG.maxTokens,
        systemPrompt: CONFIG.systemPrompt,
        autoSave: CONFIG.autoSave,
    }));

    alert('✅ Pengaturan tersimpan!');
    closeModal('settingsModal');
}

// ===== UI Functions =====
function updateStatus(text, status) {
    elements.connectionStatus.textContent = text;
    elements.connectionStatus.style.color = status === 'online' ? '#2ecc71' :
        status === 'error' ? '#e74c3c' : '#f39c12';
}

function toggleDarkMode() {
    document.body.style.filter = document.body.style.filter === 'invert(1)' ? '' : 'invert(1)';
}

// ===== Initialization =====
function init() {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    const savedConfig = localStorage.getItem('ai_config');

    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        CONFIG.temperature = config.temperature;
        CONFIG.maxTokens = config.maxTokens;
        CONFIG.systemPrompt = config.systemPrompt;
        CONFIG.autoSave = config.autoSave;

        elements.temperatureSlider.value = CONFIG.temperature * 100;
        elements.tempValue.textContent = CONFIG.temperature.toFixed(2);
        elements.maxTokens.value = CONFIG.maxTokens;
        elements.systemPrompt.value = CONFIG.systemPrompt;
        elements.autoSave.checked = CONFIG.autoSave;
    }

    if (savedApiKey) {
        elements.apiKeyInput.value = savedApiKey;
        setupAPI();
    } else {
        elements.apiKeyInput.focus();
    }
}

document.addEventListener('DOMContentLoaded', init);
