/**
 * QUICK START - Integration into advanced.html
 * 
 * Panduan cepat mengintegrasikan ContentCleaner ke dalam chat messaging
 */

// ============================================
// STEP 1: Modified Message Display Function
// ============================================

/**
 * Ubah fungsi displayMessage() Anda dengan version ini
 * yang menggunakan ContentCleaner
 */
function displayMessageWithCleaning(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.role}`;

    // Clean AI responses
    let displayContent = message.content;
    let codeBlocks = [];

    if (message.role === 'ai') {
        const cleaned = ContentCleaner.cleanAIResponse(message.content);
        displayContent = cleaned.text;
        codeBlocks = cleaned.code_blocks;
    } else {
        // Clean user messages juga
        displayContent = ContentCleaner.cleanText(message.content);
    }

    // Create message content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    // Add text
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = displayContent;
    contentDiv.appendChild(textDiv);

    // Add code blocks if any
    if (message.role === 'ai' && codeBlocks.length > 0) {
        const codeBlocksContainer = document.createElement('div');
        codeBlocksContainer.className = 'code-blocks-container';

        codeBlocks.forEach((codeBlock, index) => {
            const codeDiv = createCodeBlockElement(codeBlock, index);
            codeBlocksContainer.appendChild(codeDiv);
        });

        contentDiv.appendChild(codeBlocksContainer);
    }

    messageDiv.appendChild(contentDiv);

    // Add timestamp
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = new Date().toLocaleTimeString('id-ID');
    messageDiv.appendChild(timeDiv);

    // Append to chat
    elements.chatMessages.appendChild(messageDiv);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

/**
 * Helper: Create code block HTML element
 */
function createCodeBlockElement(codeBlock, index) {
    const codeDiv = document.createElement('div');
    codeDiv.className = `code-block language-${codeBlock.language}`;
    codeDiv.id = `code-block-${index}`;

    // Code header with language badge and copy button
    const header = document.createElement('div');
    header.className = 'code-header';

    const langBadge = document.createElement('span');
    langBadge.className = 'code-language';
    langBadge.textContent = codeBlock.language === 'unknown' 
        ? '📝 Code' 
        : `📝 ${codeBlock.language.toUpperCase()}`;
    header.appendChild(langBadge);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '📋 Copy';
    copyBtn.title = 'Copy code to clipboard';
    copyBtn.onclick = () => copyCodeToClipboard(`code-block-${index}`);
    header.appendChild(copyBtn);

    // Syntax warning indicator
    if (codeBlock.has_syntax_issues) {
        const warning = document.createElement('span');
        warning.className = 'syntax-warning-indicator';
        warning.title = 'Mungkin ada bracket/paren yang tidak tertutup';
        warning.textContent = '⚠️';
        header.appendChild(warning);
    }

    codeDiv.appendChild(header);

    // Code content
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = codeBlock.cleaned_code;
    pre.appendChild(code);
    codeDiv.appendChild(pre);

    // Syntax warnings detail
    if (codeBlock.has_syntax_issues && codeBlock.syntax_warnings) {
        const warningsDiv = document.createElement('div');
        warningsDiv.className = 'syntax-warnings';
        const warnings = codeBlock.syntax_warnings;
        
        let warningText = 'Peringatan: ';
        if (warnings.unclosed_brackets !== 0) {
            warningText += `${Math.abs(warnings.unclosed_brackets)} curved bracket tidak seimbang. `;
        }
        if (warnings.unclosed_parens !== 0) {
            warningText += `${Math.abs(warnings.unclosed_parens)} parenthesis tidak seimbang. `;
        }
        if (warnings.unclosed_squares !== 0) {
            warningText += `${Math.abs(warnings.unclosed_squares)} square bracket tidak seimbang.`;
        }
        
        warningsDiv.textContent = warningText;
        codeDiv.appendChild(warningsDiv);
    }

    return codeDiv;
}

/**
 * Copy code to clipboard
 */
function copyCodeToClipboard(codeBlockId) {
    const codeElement = document.querySelector(`#${codeBlockId} code`);
    if (!codeElement) return;

    const text = codeElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const btn = document.querySelector(`#${codeBlockId} .copy-btn`);
        const originalText = btn.textContent;
        btn.textContent = '✅ Copied!';
        
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Gagal copy kode');
    });
}


// ============================================
// STEP 2: Update sendMessage() Function
// ============================================

/**
 * Modified sendMessage dengan ContentCleaner
 * Replace fungsi sendMessage() yang sudah ada
 */
async function sendMessageWithCleaning() {
    const userMessage = elements.userInput.value.trim();

    if (!userMessage) {
        showError('Pesan tidak boleh kosong');
        return;
    }

    if (!CONFIG.isSetup || !CONFIG.apiKey) {
        showError('⚠️ Silakan setup API Key terlebih dahulu');
        return;
    }

    try {
        // Clean user message before display
        const cleanedUserMsg = ContentCleaner.cleanText(userMessage);

        // Display user message
        displayMessageWithCleaning({
            role: 'user',
            content: cleanedUserMsg
        });

        // Clear input
        elements.userInput.value = '';

        // Show loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message ai loading';
        loadingDiv.innerHTML = `
            <div class="message-content">
                <div class="loading-dots">
                    <span></span><span></span><span></span>
                </div>
                <span>AI sedang berpikir...</span>
            </div>
        `;
        elements.chatMessages.appendChild(loadingDiv);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;

        // Get AI response
        startTime = performance.now();
        const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + CONFIG.apiKey,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: userMessage }]
                    }],
                    generationConfig: {
                        temperature: CONFIG.temperature,
                        maxOutputTokens: CONFIG.maxTokens,
                    }
                })
            }
        );

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const result = await response.json();
        const aiResponse = result.candidates[0].content.parts[0].text;
        const responseTime = ((performance.now() - startTime) / 1000).toFixed(2);

        // Remove loading indicator
        loadingDiv.remove();

        // Display cleaned AI response
        displayMessageWithCleaning({
            role: 'ai',
            content: aiResponse
        });

        // Update stats
        elements.responseTime.textContent = `${responseTime}s`;

    } catch (error) {
        console.error('Error:', error);
        showError(`❌ Error: ${error.message}`);
        
        // Remove loading indicator
        const loadingDiv = document.querySelector('.message.ai.loading');
        if (loadingDiv) loadingDiv.remove();
    }
}

// Replace tombol send supaya gunakan fungsi baru
// elements.sendBtn.onclick = sendMessageWithCleaning;

// Atau jika menggunakan event listener:
if (elements.sendBtn) {
    elements.sendBtn.removeEventListener('click', sendMessage);
    elements.sendBtn.addEventListener('click', sendMessageWithCleaning);
}


// ============================================
// STEP 3: CSS Styling untuk Code Blocks
// ============================================

const codeBlockStyles = `
<style>
    /* Code block container */
    .code-blocks-container {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    /* Individual code block */
    .code-block {
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 6px;
        overflow: hidden;
        margin: 8px 0;
    }

    .code-block.language-python {
        border-left: 4px solid #3776ab;
    }

    .code-block.language-javascript {
        border-left: 4px solid #f1e05a;
    }

    .code-block.language-html {
        border-left: 4px solid #e34c26;
    }

    .code-block.language-css {
        border-left: 4px solid #563d7c;
    }

    .code-block.language-java {
        border-left: 4px solid #007396;
    }

    .code-block.language-cpp {
        border-left: 4px solid #00599c;
    }

    /* Code header */
    .code-header {
        background: #333;
        color: #fff;
        padding: 8px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: 500;
    }

    .code-language {
        font-weight: bold;
        letter-spacing: 0.5px;
    }

    .syntax-warning-indicator {
        cursor: help;
        margin-left: 8px;
        font-size: 14px;
    }

    /* Copy button */
    .copy-btn {
        background: #555;
        color: #fff;
        border: none;
        padding: 4px 8px;
        cursor: pointer;
        border-radius: 3px;
        font-size: 12px;
        transition: background 0.3s;
    }

    .copy-btn:hover {
        background: #777;
    }

    .copy-btn:active {
        background: #999;
    }

    /* Code content */
    .code-block pre {
        margin: 0;
        padding: 12px;
        overflow-x: auto;
        background: #f5f5f5;
    }

    .code-block code {
        font-family: 'Courier New', Courier, monospace;
        font-size: 13px;
        line-height: 1.4;
        color: #333;
        display: block;
        white-space: pre;
    }

    /* Syntax warnings */
    .syntax-warnings {
        background: #fff3cd;
        color: #856404;
        padding: 8px 12px;
        font-size: 12px;
        border-top: 1px solid #ffc107;
    }

    /* Message text dengan AI content */
    .message-text {
        line-height: 1.6;
        color: #333;
        margin-bottom: 8px;
    }

    .message.ai .message-text {
        color: #222;
    }

    .message.user .message-text {
        color: #fff;
    }

    /* Message timestamp */
    .message-time {
        font-size: 11px;
        color: #999;
        margin-top: 6px;
    }

    /* Loading animation */
    .loading-dots {
        display: inline-flex;
        gap: 3px;
    }

    .loading-dots span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #666;
        animation: bounce 1.4s infinite;
    }

    .loading-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .loading-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes bounce {
        0%, 80%, 100% {
            opacity: 0.5;
        }
        40% {
            opacity: 1;
        }
    }
</style>
`;


// ============================================
// STEP 4: Integration Checklist
// ============================================

const integrationChecklistHTML = `
<!================================ INTEGRATION CHECKLIST ================================>

Untuk mengintegrasikan ContentCleaner ke chat Anda, ikuti step ini:

[✓] 1. ContentCleaner module sudah ada di advanced.js
[  ] 2. Update HTML message display function -> displayMessageWithCleaning()
[  ] 3. Update sendMessage function -> sendMessageWithCleaning()
[  ] 4. Tambah CSS styles untuk code blocks
[  ] 5. Update button event listeners
[  ] 6. Test di browser

DETAIL LANGKAH:

1. Copy fungsi displayMessageWithCleaning() ke advanced.js
2. Copy fungsi createCodeBlockElement() ke advanced.js
3. Copy fungsi copyCodeToClipboard() ke advanced.js
4. Copy sendMessageWithCleaning() ke advanced.js
5. Comment/remove fungsi lama yang sudah diganti
6. Copy CSS styles ke style-advanced.css
7. Update HTML untuk gunakan fungsi baru
8. Test di browser dengan mengirim pesan ke AI

TESTING:

1. Buka advanced.html
2. Setup API key
3. Kirim pesan ke AI
4. Verifikasi teks dibersihkan (tanpa extra whitespace)
5. Verifikasi code blocks ditampilkan dengan rapi
6. Test tombol "Copy Code"
7. Test syntax warning detection

EXPECTED RESULT:

✓ AI response terbersihkan otomatis
✓ Code blocks ditampilkan dengan indentasi rapi
✓ Language badge muncul di code blocks
✓ Copy button bekerja
✓ Syntax warnings ditampilkan jika ada issues
✓ UI tetap responsive

JIKA ADA MASALAH:

- Check browser console untuk errors (F12)
- Pastikan ContentCleaner module sudah loaded
- Verifikasi CSS styles sudah diterapkan
- Check network tab untuk API responses

<!================================================================================================>
`;

console.log(integrationChecklistHTML);


// ============================================
// STEP 5: Manual Integration (Copy-Paste)
// ============================================

/*
JIKA ANDA INGIN QUICK SETUP:

1. Buka advanced.html
2. Cari fungsi displayMessage()
3. Replace dengan displayMessageWithCleaning()
4. Cari fungsi sendMessage()
5. Replace dengan sendMessageWithCleaning()
6. Buka style-advanced.css
7. Paste CSS styles dari step 3
8. Save dan reload page

Itu saja! Sekarang ContentCleaner akan automatic clean semua output.
*/

// ============================================
// BONUS: Utility Functions
// ============================================

/**
 * Buat file dari text (untuk download transcript)
 */
function downloadTranscript(format = 'txt') {
    const messages = document.querySelectorAll('.message');
    let content = '';

    messages.forEach(msg => {
        const role = msg.classList.contains('user') ? 'User' : 'AI';
        const text = msg.querySelector('.message-text').textContent;
        content += `[${role}]\n${text}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString().split('T')[0]}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Clear chat dengan confirmation
 */
function clearChatWithConfirmation() {
    if (confirm('Apakah Anda yakin ingin menghapus semua pesan?')) {
        elements.chatMessages.innerHTML = '<div class="message welcome"><h3>Selamat Datang! 👋</h3></div>';
    }
}

/**
 * Export code blocks only
 */
function exportCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');
    if (codeBlocks.length === 0) {
        alert('Tidak ada code blocks untuk di-export');
        return;
    }

    let content = '';
    codeBlocks.forEach((block, index) => {
        const lang = block.classList[1]?.replace('language-', '') || 'unknown';
        const code = block.querySelector('code').textContent;
        content += `// ===== CODE BLOCK ${index + 1} (${lang.toUpperCase()}) =====\n`;
        content += code + '\n\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code-blocks-${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

console.log('✓ Quick Start Integration Guide loaded');
console.log('Gunakan fungsi-fungsi di atas untuk integrasi ContentCleaner');
