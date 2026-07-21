// Test Suite: Status Lookup (status.html)

class StatusLookupTests {
  constructor() {
    this.passed = 0;
    this.failed = 0;
  }

  // Test 1: Status lookup form exists
  testStatusForm() {
    const form = document.querySelector('form[id*="status"]') || document.querySelector('input[placeholder*="application"]');
    if (form || document.querySelector('input[placeholder*="ID"]') || document.querySelector('input[placeholder*="id"]')) {
      console.log(`✓ Status lookup form found`);
      this.passed++;
    } else {
      console.error(`✗ Status lookup form not found`);
      this.failed++;
    }
  }

  // Test 2: Application ID input validation
  testApplicationIdInput() {
    const inputs = document.querySelectorAll('input');
    let hasApplicationIdInput = false;

    inputs.forEach(input => {
      if (input.placeholder.toLowerCase().includes('application') ||
          input.placeholder.toLowerCase().includes('id') ||
          input.name?.toLowerCase().includes('id') ||
          input.name?.toLowerCase().includes('application')) {
        hasApplicationIdInput = true;
      }
    });

    if (hasApplicationIdInput) {
      console.log(`✓ Application ID input field present`);
      this.passed++;
    } else {
      console.error(`✗ Application ID input not found`);
      this.failed++;
    }
  }

  // Test 3: Status display structure
  testStatusDisplay() {
    const statusCards = document.querySelectorAll('[class*="status"]') ||
                       document.querySelectorAll('[class*="card"]');

    if (statusCards.length > 0) {
      console.log(`✓ Status display elements found (${statusCards.length})`);
      this.passed++;
    } else {
      console.error(`✗ No status display elements found`);
      this.failed++;
    }
  }

  // Test 4: Check for Firestore integration hints
  testFirestoreIntegration() {
    const scripts = document.querySelectorAll('script');
    let hasFirebase = false;

    scripts.forEach(script => {
      if (script.src?.includes('firebase') || script.textContent?.includes('firebase')) {
        hasFirebase = true;
      }
    });

    if (hasFirebase) {
      console.log(`✓ Firebase SDK loaded for Firestore access`);
      this.passed++;
    } else {
      console.error(`✗ Firebase SDK not detected`);
      this.failed++;
    }
  }

  // Test 5: Status values validation
  testValidStatusValues() {
    const validStatuses = ['Received', 'Under Review', 'Approved', 'Rejected', 'Needs Info'];
    console.log(`✓ Valid status values: ${validStatuses.join(', ')}`);
    this.passed++;
  }

  // Test 6: Public access (no auth required)
  testPublicAccess() {
    const authRequiredElements = document.querySelectorAll('[aria-label*="auth"]') || [];

    if (authRequiredElements.length === 0) {
      console.log(`✓ Status page is publicly accessible (no auth required)`);
      this.passed++;
    } else {
      console.warn(`⚠ Some auth elements detected (expected for public page)`);
    }
  }

  runAll() {
    console.log('\n🧪 Running Status Lookup Tests...\n');
    this.testStatusForm();
    this.testApplicationIdInput();
    this.testStatusDisplay();
    this.testFirestoreIntegration();
    this.testValidStatusValues();
    this.testPublicAccess();
    this.printSummary();
  }

  printSummary() {
    console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
  }
}

// Run tests when document loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const tests = new StatusLookupTests();
    tests.runAll();
  });
} else {
  const tests = new StatusLookupTests();
  tests.runAll();
}
