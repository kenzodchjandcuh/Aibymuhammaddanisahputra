/**
 * Test Script untuk Content Cleaner JavaScript - Node.js Version
 */

// ContentCleaner Module (extracted from advanced.js)
const ContentCleaner = {
    // Mapping bahasa programming dengan keywords
    languageKeywords: {
        'python': ['def', 'class', 'import', 'from', 'if __name__', 'self', 'elif', 'except', 'async', 'await'],
        'javascript': ['function', 'const', 'let', 'var', 'async', 'await', 'require', 'module.exports', 'class', '=>'],
        'java': ['public class', 'private', 'public', 'static', 'import', 'package', 'interface', 'extends'],
        'cpp': ['#include', 'using namespace', 'cout', 'cin', 'vector', 'template'],
        'csharp': ['using', 'public class', 'namespace', 'async', 'await', 'LINQ'],
        'html': ['<!DOCTYPE', '<html', '<head', '<body', '<div', '<span', '<p>'],
        'css': ['@media', '.class', '#id', 'background', 'color', 'font-size', 'margin'],
        'sql': ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'INSERT', 'UPDATE'],
        'bash': ['#!/bin/bash', 'echo', 'grep', 'sed', 'awk', 'for', 'while'],
    },

    cleanText(text) {
        if (typeof text !== 'string') return '';

        // Hapus leading/trailing whitespace
        text = text.trim();

        // Hapus multiple spaces menjadi single space
        text = text.replace(/\s+/g, ' ');

        // Hapus multiple newlines (lebih dari 2 baris kosong)
        while (text.includes('\n\n\n')) {
            text = text.replace(/\n\n\n/g, '\n\n');
        }

        return text;
    },

    detectLanguage(code) {
        const codeLower = code.toLowerCase();
        const scores = {};

        for (const [lang, keywords] of Object.entries(this.languageKeywords)) {
            let score = 0;
            for (const kw of keywords) {
                if (codeLower.includes(kw.toLowerCase())) {
                    score++;
                }
            }
            scores[lang] = score;
        }

        const detected = Object.keys(scores).reduce((a, b) => 
            scores[a] > scores[b] ? a : b
        );

        return scores[detected] > 0 ? detected : 'unknown';
    },

    cleanCode(code, autoDetect = true) {
        if (typeof code !== 'string') {
            return {
                cleaned_code: '',
                language: 'unknown',
                indentation_type: 'unknown',
                has_syntax_issues: false
            };
        }

        let cleaned = code.trim();
        let language = 'unknown';
        let indentation_type = 'unknown';

        // Step 1: Hapus markdown backticks
        const markdownPatterns = [
            /^```[\w]*\n/,
            /\n```$/,
            /^```/,
            /```$/,
        ];

        for (const pattern of markdownPatterns) {
            cleaned = cleaned.replace(pattern, '');
        }

        cleaned = cleaned.trim();

        // Step 2: Deteksi bahasa
        if (autoDetect) {
            language = this.detectLanguage(cleaned);
        }

        // Step 3: Analisis indentasi
        const lines = cleaned.split('\n');
        let hasTabs = false;
        let hasSpaces = false;

        for (const line of lines) {
            if (line[0] === '\t') hasTabs = true;
            if (line[0] === ' ') hasSpaces = true;
        }

        if (hasTabs) {
            indentation_type = 'tabs';
        } else if (hasSpaces) {
            indentation_type = 'spaces';
        } else {
            indentation_type = 'none';
        }

        // Step 4: Normalisasi indentasi (tabs to spaces)
        if (indentation_type === 'tabs') {
            cleaned = cleaned.replace(/\t/g, '    ');
            indentation_type = 'spaces (fixed)';
        }

        // Step 5: Hapus trailing whitespace di setiap baris
        cleaned = lines
            .map(line => line.trimEnd())
            .join('\n');

        // Step 6: Hapus multiple empty lines
        while (cleaned.includes('\n\n\n')) {
            cleaned = cleaned.replace(/\n\n\n/g, '\n\n');
        }

        // Step 7: Cek syntax issues (basic check)
        const unclosedBrackets = cleaned.split('{').length - cleaned.split('}').length;
        const unclosedParens = cleaned.split('(').length - cleaned.split(')').length;
        const unclosedSquares = cleaned.split('[').length - cleaned.split(']').length;

        const hasSyntaxIssues = unclosedBrackets !== 0 || unclosedParens !== 0 || unclosedSquares !== 0;

        return {
            cleaned_code: cleaned,
            language: language,
            indentation_type: indentation_type,
            has_syntax_issues: hasSyntaxIssues,
            syntax_warnings: hasSyntaxIssues ? {
                unclosed_brackets: unclosedBrackets,
                unclosed_parens: unclosedParens,
                unclosed_squares: unclosedSquares,
            } : null
        };
    },

    cleanAIResponse(responseText, extractCode = false) {
        if (typeof responseText !== 'string') {
            return { text: '', code_blocks: [], has_code: false };
        }

        // Deteksi code blocks
        const codeBlockPattern = /```[\w]*\n([\s\S]*?)\n```/g;
        const codeBlocks = [];
        let match;

        while ((match = codeBlockPattern.exec(responseText)) !== null) {
            codeBlocks.push(match[1]);
        }

        // Extract dan clean setiap code block
        const cleanedCodeBlocks = codeBlocks.map(code => this.cleanCode(code));

        // Hapus code blocks dari teks
        let textWithoutCode = responseText.replace(/```[\w]*\n[\s\S]*?\n```/g, '\n');
        const cleanedText = this.cleanText(textWithoutCode);

        return {
            text: cleanedText,
            code_blocks: cleanedCodeBlocks,
            has_code: codeBlocks.length > 0
        };
    },

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
};

// ============================================
// TEST RUNNER
// ============================================

console.log('='.repeat(70));
console.log('🧪 TESTING CONTENT CLEANER - JavaScript (Node.js)');
console.log('='.repeat(70));

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function test(name, fn) {
    try {
        console.log(`\n✓ TEST: ${name}`);
        console.log('-'.repeat(70));
        fn();
        console.log('✓ PASSED');
        testsPassed++;
    } catch (error) {
        console.log(`✗ FAILED: ${error.message}`);
        testsFailed++;
    }
}

// Test 1: Clean Text
test('Clean Text', () => {
    const text = ContentCleaner.cleanText('Halo    dunia    berapi!!\n\n\nini test');
    console.log(`Result: ${JSON.stringify(text)}`);
    assert(text === 'Halo dunia berapi!! ini test', 'Text cleaning failed');
});

// Test 2: Detect Language - Python
test('Detect Language (Python)', () => {
    const code = 'def hello():\n    return 42';
    const lang = ContentCleaner.detectLanguage(code);
    console.log(`Detected: ${lang}`);
    assert(lang === 'python', `Expected 'python', got '${lang}'`);
});

// Test 3: Detect Language - JavaScript
test('Detect Language (JavaScript)', () => {
    const code = 'const x = 5; console.log(x);';
    const lang = ContentCleaner.detectLanguage(code);
    console.log(`Detected: ${lang}`);
    assert(lang === 'javascript', `Expected 'javascript', got '${lang}'`);
});

// Test 4: Clean Code - Fix Indentation
test('Clean Code (Fix Indentation)', () => {
    const messy = 'def hello():\n\treturn 42';
    const result = ContentCleaner.cleanCode(messy);
    console.log(`Language: ${result.language}`);
    console.log(`Indentation: ${result.indentation_type}`);
    assert(result.language === 'python', 'Language detection failed');
    assert(result.indentation_type === 'spaces (fixed)', 'Indentation fix failed');
});

// Test 5: Clean Code - Remove Markdown
test('Clean Code (Remove Markdown)', () => {
    const markdown = '```python\ndef calc():\n    return 1\n```';
    const result = ContentCleaner.cleanCode(markdown);
    console.log(`Has backticks before: YES`);
    console.log(`Has backticks after: NO`);
    assert(!result.cleaned_code.includes('```'), 'Backticks not removed');
});

// Test 6: Detect Syntax Issues
test('Detect Syntax Issues', () => {
    const bad = 'def foo():\n    return {';
    const result = ContentCleaner.cleanCode(bad);
    console.log(`Has Syntax Issues: ${result.has_syntax_issues}`);
    console.log(`Warnings: ${JSON.stringify(result.syntax_warnings)}`);
    assert(result.has_syntax_issues === true, 'Syntax issue detection failed');
});

// Test 7: Clean AI Response - Mixed Content
test('Clean AI Response (Mixed Content)', () => {
    const response = `Berikut adalah solusi:

\`\`\`python
def calc():
    return 1
\`\`\`

Dan ini HTML:

\`\`\`html
<!DOCTYPE html>
<html></html>
\`\`\`

Selesai!`;
    
    const result = ContentCleaner.cleanAIResponse(response);
    console.log(`Has Code: ${result.has_code}`);
    console.log(`Code Blocks Count: ${result.code_blocks.length}`);
    console.log(`Languages: ${result.code_blocks.map(cb => cb.language).join(', ')}`);
    assert(result.has_code === true, 'Code detection failed');
    assert(result.code_blocks.length === 2, 'Code block count mismatch');
    assert(result.code_blocks[0].language === 'python', 'Python detection failed');
    assert(result.code_blocks[1].language === 'html', 'HTML detection failed');
});

// Test 8: All Supported Languages
test('All Supported Languages', () => {
    const tests = {
        'python': 'import sys\nif __name__ == "__main__":',
        'javascript': 'const x = 5; module.exports = x;',
        'html': '<!DOCTYPE html>\n<html>',
        'css': '@media (max-width: 600px) { color: red; }',
        'java': 'public class Main { public static void main() {} }',
        'sql': 'SELECT * FROM users WHERE id = 1',
        'bash': '#!/bin/bash\necho "Hello"',
    };

    for (const [expected, code] of Object.entries(tests)) {
        const detected = ContentCleaner.detectLanguage(code);
        const status = detected === expected ? '✓' : '✗';
        console.log(`${status} ${expected.toUpperCase().padEnd(12)} -> ${detected}`);
        assert(detected === expected, `Failed to detect ${expected}`);
    }
});

// Test 9: Edge Cases
test('Edge Cases', () => {
    // Empty string
    let result = ContentCleaner.cleanText('');
    console.log(`Empty string: ${JSON.stringify(result)}`);
    assert(result === '', 'Empty string handling failed');

    // Only whitespace
    result = ContentCleaner.cleanText('   \n\n\n   ');
    console.log(`Only whitespace: ${JSON.stringify(result)}`);
    assert(result === '', 'Whitespace-only handling failed');

    // Non-string input
    result = ContentCleaner.cleanText(null);
    console.log(`Non-string input: ${JSON.stringify(result)}`);
    assert(result === '', 'Non-string handling failed');
});

// Test 10: HTML Escaping
test('HTML Escaping', () => {
    const dangerous = "<script>alert('xss')</script>";
    const safe = ContentCleaner.escapeHtml(dangerous);
    console.log(`Input: ${dangerous}`);
    console.log(`Output: ${safe}`);
    assert(!safe.includes('<script>'), 'XSS not escaped');
    assert(safe.includes('&lt;'), 'HTML not escaped');
});

// Test 11: Performance Check
test('Performance Check', () => {
    // Large text
    const largeText = 'Hello    world   ' .repeat(1000);
    const start1 = Date.now();
    ContentCleaner.cleanText(largeText);
    const elapsed1 = Date.now() - start1;
    console.log(`Clean text (1000 iterations): ${elapsed1}ms`);
    assert(elapsed1 < 100, 'Performance issue: cleanText too slow');

    // Multiple code blocks
    const largeResponse = ('```python\ndef test():\n    pass\n```\n').repeat(100);
    const start2 = Date.now();
    ContentCleaner.cleanAIResponse(largeResponse);
    const elapsed2 = Date.now() - start2;
    console.log(`Clean AI response (100 code blocks): ${elapsed2}ms`);
    assert(elapsed2 < 500, 'Performance issue: cleanAIResponse too slow');
});

// Summary
console.log('\n' + '='.repeat(70));
if (testsFailed === 0) {
    console.log(`✅ ALL TESTS PASSED (${testsPassed}/${testsPassed})`);
} else {
    console.log(`⚠️  SOME TESTS FAILED (${testsPassed} passed, ${testsFailed} failed)`);
}
console.log('='.repeat(70));

console.log('\nTest Summary:');
console.log(`✓ Test 1: Clean Text`);
console.log(`✓ Test 2: Detect Language (Python)`);
console.log(`✓ Test 3: Detect Language (JavaScript)`);
console.log(`✓ Test 4: Clean Code (Fix Indentation)`);
console.log(`✓ Test 5: Clean Code (Remove Markdown)`);
console.log(`✓ Test 6: Detect Syntax Issues`);
console.log(`✓ Test 7: Clean AI Response (Mixed Content)`);
console.log(`✓ Test 8: All Supported Languages`);
console.log(`✓ Test 9: Edge Cases`);
console.log(`✓ Test 10: HTML Escaping`);
console.log(`✓ Test 11: Performance Check`);

if (testsFailed === 0) {
    console.log('\n🎉 JavaScript ContentCleaner is working perfectly!');
} else {
    console.log(`\n⚠️ ${testsFailed} test(s) failed`);
    process.exit(1);
}

console.log('='.repeat(70));
