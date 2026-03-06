/**
 * Content Cleaner JavaScript - Contoh Penggunaan
 * 
 * Format file: content_cleaner_examples.js
 * Demonstrasi penggunaan ContentCleaner module dari advanced.js
 */

// ============================================
// EXAMPLE 1: Clean Text (Bersihkan Teks)
// ============================================
console.log("=".repeat(70));
console.log("EXAMPLE 1: CLEAN TEXT");
console.log("=".repeat(70));

const messyText = `
Ini adalah teks    yang      sangat   berantakan.
Ada   banyak  spasi    berlebih.


Dan juga banyak    baris kosong.


Teks ini perlu dibersihkan   dengan   baik.
`;

const cleanedText = ContentCleaner.cleanText(messyText);
console.log("BEFORE:");
console.log(messyText);
console.log("\nAFTER:");
console.log(cleanedText);


// ============================================
// EXAMPLE 2: Detect Language (Deteksi Bahasa)
// ============================================
console.log("\n" + "=".repeat(70));
console.log("EXAMPLE 2: DETECT PROGRAMMING LANGUAGE");
console.log("=".repeat(70));

const codeSamples = {
    python: `
def greet(name):
    print(f"Hello, {name}!")
    return True

if __name__ == "__main__":
    greet("World")
`,
    javascript: `
function greet(name) {
    console.log(\`Hello, \${name}!\`);
    return true;
}

module.exports = greet;
`,
    html: `
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
`
};

for (const [expectedLang, code] of Object.entries(codeSamples)) {
    const detected = ContentCleaner.detectLanguage(code);
    const status = detected === expectedLang ? "✓" : "✗";
    console.log(`${status} Expected: ${expectedLang.padEnd(12)} | Detected: ${detected}`);
}


// ============================================
// EXAMPLE 3: Clean Code (Bersihkan Kode)
// ============================================
console.log("\n" + "=".repeat(70));
console.log("EXAMPLE 3: CLEAN CODE");
console.log("=".repeat(70));

const messyCode = `\`\`\`python
def  calculate_sum( numbers ):
	total   =  0
	for    num    in    numbers:
		total   +=   num
	return    total

result = calculate_sum([1, 2, 3, 4, 5])
print(result)
\`\`\``;

const result = ContentCleaner.cleanCode(messyCode);
console.log("Language Detected:", result.language);
console.log("Indentation Type:", result.indentation_type);
console.log("Has Syntax Issues:", result.has_syntax_issues);
console.log("\nCLEANED CODE:\n");
console.log(result.cleaned_code);
console.log("\nSyntax Warnings:", result.syntax_warnings);


// ============================================
// EXAMPLE 4: Clean AI Response (Response Lengkap)
// ============================================
console.log("\n" + "=".repeat(70));
console.log("EXAMPLE 4: CLEAN COMPLETE AI RESPONSE");
console.log("=".repeat(70));

const aiResponse = `
Berikut adalah   solusi    untuk masalah Anda:

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

Penjelasan:
- Fungsi menggunakan    rekursi
- Base case adalah n <= 1
- Dikembalikan nilai fibonacci

\`\`\`javascript
function fib(n) {
  return n <= 1 ? n : fib(n-1) + fib(n-2);
}
\`\`\`

Kedua versi melakukan    hal yang sama!
`;

const aiResult = ContentCleaner.cleanAIResponse(aiResponse);
console.log("Has Code Blocks:", aiResult.has_code);
console.log("Number of Code Blocks:", aiResult.code_blocks.length);
console.log("\nCLEANED TEXT:\n", aiResult.text);
console.log("\nCODE BLOCKS FOUND:");
aiResult.code_blocks.forEach((codeBlock, i) => {
    console.log(`\n--- Code Block ${i + 1} (${codeBlock.language}) ---`);
    console.log(codeBlock.cleaned_code.substring(0, 100) + "...");
});


// ============================================
// EXAMPLE 5: Format Code For Display
// ============================================
console.log("\n" + "=".repeat(70));
console.log("EXAMPLE 5: FORMAT CODE FOR DISPLAY");
console.log("=".repeat(70));

const codeForDisplay = `\`\`\`javascript
const message = "Hello, World!";
console.log(message);
\`\`\``;

const displayResult = ContentCleaner.formatCodeForDisplay(codeForDisplay);
console.log("Language Display:", displayResult.language_display);
console.log("Generated HTML:");
console.log(displayResult.formatted_html);


// ============================================
// EXAMPLE 6: Integration Pattern
// ============================================
console.log("\n" + "=".repeat(70));
console.log("EXAMPLE 6: INTEGRATION PATTERN");
console.log("=".repeat(70));

/**
 * Contoh integrasi ke dalam message display
 */
class AIMessageProcessor {
    constructor() {
        this.cleaner = ContentCleaner;
    }

    /**
     * Process AI response untuk ditampilkan ke user
     */
    processForDisplay(aiResponse) {
        const cleaned = this.cleaner.cleanAIResponse(aiResponse);

        return {
            text: cleaned.text,
            codeBlocks: cleaned.code_blocks.map(code => ({
                language: code.language,
                displayName: code.language === 'unknown' ? '📝 Code' : `📝 ${code.language.toUpperCase()}`,
                code: code.cleaned_code,
                hasSyntaxIssues: code.has_syntax_issues,
                warnings: code.syntax_warnings
            })),
            hasCode: cleaned.has_code,
            htmlContent: this.renderHTML(cleaned)
        };
    }

    /**
     * Render HTML untuk ditampilkan di chat message
     */
    renderHTML(cleaned) {
        let html = `<div class="ai-response">`;

        // Add cleaned text
        html += `<div class="response-text">${this.escapeHtml(cleaned.text)}</div>`;

        // Add code blocks
        if (cleaned.code_blocks.length > 0) {
            html += `<div class="code-blocks">`;
            cleaned.code_blocks.forEach((codeBlock, index) => {
                html += `
                    <div class="code-block" data-language="${codeBlock.language}">
                        <div class="code-header">
                            <span class="code-language">${codeBlock.language.toUpperCase()}</span>
                            <button class="copy-btn" onclick="copyCode(this)" title="Copy Code">📋</button>
                        </div>
                        <pre><code>${this.escapeHtml(codeBlock.cleaned_code)}</code></pre>
                        ${codeBlock.has_syntax_issues ? `<div class="syntax-warning">⚠️ Mungkin ada bracket yang tidak tertutup</div>` : ''}
                    </div>
                `;
            });
            html += `</div>`;
        }

        html += `</div>`;
        return html;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Penggunaan
const processor = new AIMessageProcessor();
const processed = processor.processForDisplay(aiResponse);

console.log("Processed Result:");
console.log("- Text:", processed.text.substring(0, 50) + "...");
console.log("- Has Code:", processed.hasCode);
console.log("- Code Blocks Count:", processed.codeBlocks.length);
console.log("- First Code Language:", processed.codeBlocks[0]?.language);


// ============================================
// EXAMPLE 7: Real-world Usage in HTML
// ============================================
console.log("\n" + "=".repeat(70));
console.log("EXAMPLE 7: REAL-WORLD HTML INTEGRATION");
console.log("=".repeat(70));

const htmlIntegrationExample = `
<!-- Di dalam message display handler -->
<div id="chatMessages">
    <!-- Sebelum: Raw AI response dengan formatting yang berantakan -->
    
    <!-- Sesudah: Clean formatted output -->
    <div class="message ai">
        <div class="message-content">
            <!-- Text dibersihkan -->
            <p>Berikut adalah solusi untuk masalah Anda:</p>
            
            <!-- Code blocks dibersihkan dan diformat -->
            <div class="code-block" data-language="python">
                <div class="code-header">
                    <span class="code-language">PYTHON</span>
                    <button class="copy-btn">📋</button>
                </div>
                <pre><code>def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))</code></pre>
            </div>
            
            <p>Penjelasan:</p>
            <ul>
                <li>Fungsi menggunakan rekursi</li>
                <li>Base case adalah n <= 1</li>
                <li>Dikembalikan nilai fibonacci</li>
            </ul>
        </div>
    </div>
</div>

<style>
    .code-block {
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 6px;
        margin: 10px 0;
        overflow: hidden;
    }
    
    .code-header {
        background: #333;
        color: #fff;
        padding: 8px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .code-language {
        font-weight: bold;
        font-size: 12px;
    }
    
    .copy-btn {
        background: #555;
        color: #fff;
        border: none;
        padding: 4px 8px;
        cursor: pointer;
        border-radius: 3px;
    }
    
    .copy-btn:hover {
        background: #777;
    }
    
    pre code {
        display: block;
        padding: 12px;
        overflow-x: auto;
    }
</style>
`;

console.log("Integration example created");
console.log(htmlIntegrationExample);


console.log("\n" + "=".repeat(70));
console.log("✓ All JavaScript examples completed!");
console.log("=".repeat(70));

// Uncomment untuk testing di browser console
// Buka file advanced.html, buka Developer Console (F12), 
// kemudian paste code-code di atas untuk testing
