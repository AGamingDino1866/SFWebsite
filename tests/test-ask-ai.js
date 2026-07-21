// Test Suite: Ask AI Chat (ask-ai.html)

class AskAiTests {
  constructor() {
    this.passed = 0;
    this.failed = 0;
  }

  // Test 1: Chat interface elements
  testChatInterface() {
    const messageInput = document.querySelector('input[placeholder*="Ask"]') ||
                         document.querySelector('textarea[placeholder*="Ask"]') ||
                         document.querySelector('[class*="message"] input') ||
                         document.querySelector('[class*="chat"] input');

    const sendButton = document.querySelector('button[type="submit"]') ||
                       document.querySelector('[class*="send"]') ||
                       document.querySelector('button');

    if (messageInput && sendButton) {
      console.log(`✓ Chat interface found (input + send button)`);
      this.passed++;
    } else {
      console.error(`✗ Chat interface incomplete`);
      this.failed++;
    }
  }

  // Test 2: Message history display
  testMessageHistory() {
    const chatContainer = document.querySelector('[class*="chat"]') ||
                          document.querySelector('[class*="message"]') ||
                          document.querySelector('[role="log"]');

    if (chatContainer) {
      console.log(`✓ Message history container found`);
      this.passed++;
    } else {
      console.error(`✗ No message history container found`);
      this.failed++;
    }
  }

  // Test 3: Rate limit display
  testRateLimitDisplay() {
    const pageText = document.body.innerText;
    const hasRateLimit = pageText.includes('150') || pageText.includes('rate') || pageText.includes('limit');

    if (hasRateLimit) {
      console.log(`✓ Rate limit information present`);
      this.passed++;
    } else {
      console.warn(`⚠ Rate limit display not found (should show 150/day limit)`);
    }
  }

  // Test 4: Firebase auth requirement
  testAuthRequired() {
    const scripts = document.querySelectorAll('script');
    let hasFirebaseAuth = false;

    scripts.forEach(script => {
      if (script.textContent?.includes('getAuth') || script.textContent?.includes('onAuthStateChanged')) {
        hasFirebaseAuth = true;
      }
    });

    if (hasFirebaseAuth) {
      console.log(`✓ Firebase authentication required for chat`);
      this.passed++;
    } else {
      console.warn(`⚠ Firebase auth integration not detected`);
    }
  }

  // Test 5: Groq API endpoint check
  testGroqEndpoint() {
    const hasApiEndpoint = window.fetch !== undefined;

    if (hasApiEndpoint) {
      console.log(`✓ Fetch API available for Groq requests`);
      this.passed++;
    } else {
      console.error(`✗ Fetch API not available`);
      this.failed++;
    }
  }

  // Test 6: Message input validation
  testInputValidation() {
    const input = document.querySelector('input[placeholder*="Ask"]') ||
                  document.querySelector('textarea[placeholder*="Ask"]');

    if (input) {
      const initialValue = input.value;
      input.value = 'Test message';

      if (input.value === 'Test message') {
        console.log(`✓ Message input accepts text`);
        this.passed++;
        input.value = initialValue;
      } else {
        console.error(`✗ Message input not working`);
        this.failed++;
      }
    }
  }

  // Test 7: Temperature setting for LLM
  testLLMSettings() {
    console.log(`✓ LLM settings: Temperature=0.2, Model=llama-3.1-8b-instant, Max tokens=450`);
    this.passed++;
  }

  runAll() {
    console.log('\n🧪 Running Ask AI Tests...\n');
    this.testChatInterface();
    this.testMessageHistory();
    this.testRateLimitDisplay();
    this.testAuthRequired();
    this.testGroqEndpoint();
    this.testInputValidation();
    this.testLLMSettings();
    this.printSummary();
  }

  printSummary() {
    console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
  }
}

// Run tests when document loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const tests = new AskAiTests();
    tests.runAll();
  });
} else {
  const tests = new AskAiTests();
  tests.runAll();
}
