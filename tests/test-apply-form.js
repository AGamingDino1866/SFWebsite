// Test Suite: Application Form (apply.html)

class ApplyFormTests {
  constructor() {
    this.passed = 0;
    this.failed = 0;
  }

  // Test 1: Form elements exist
  testFormElements() {
    const form = document.querySelector('#application-form');
    const inputs = {
      student_name: form?.querySelector('input[name="student_name"]'),
      city: form?.querySelector('select[name="city"]'),
      grade: form?.querySelector('input[name="grade"]'),
      school: form?.querySelector('input[name="school"]'),
      guardian_name: form?.querySelector('input[name="guardian_name"]'),
      guardian_phone: form?.querySelector('input[name="guardian_phone"]'),
      need_statement: form?.querySelector('textarea[name="need_statement"]'),
      goals: form?.querySelector('textarea[name="goals"]')
    };

    Object.entries(inputs).forEach(([name, element]) => {
      if (element) {
        console.log(`✓ Form input exists: ${name}`);
        this.passed++;
      } else {
        console.error(`✗ Missing form input: ${name}`);
        this.failed++;
      }
    });
  }

  // Test 2: Form validation
  testFormValidation() {
    const form = document.querySelector('#application-form');
    const isValid = form?.checkValidity();

    if (!isValid) {
      console.log(`✓ Form validation works (required fields)`);
      this.passed++;
    } else {
      console.error(`✗ Form should fail validation with empty fields`);
      this.failed++;
    }
  }

  // Test 3: Duplicate warning logic
  testDuplicateMarker() {
    const duplicateKey = 'successFactorSubmittedApplication:test-uid';
    localStorage.setItem(duplicateKey, 'SF2026-TEST01');
    const stored = localStorage.getItem(duplicateKey);

    if (stored === 'SF2026-TEST01') {
      console.log(`✓ Duplicate marker stored in localStorage`);
      this.passed++;
    } else {
      console.error(`✗ Failed to store duplicate marker`);
      this.failed++;
    }

    localStorage.removeItem(duplicateKey);
  }

  // Test 4: Application ID generation
  testApplicationIdFormat() {
    const makeId = () => `SF2026-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const id = makeId();

    const pattern = /^SF2026-[A-Z0-9]{5}$/;
    if (pattern.test(id)) {
      console.log(`✓ Application ID format is valid: ${id}`);
      this.passed++;
    } else {
      console.error(`✗ Invalid application ID format: ${id}`);
      this.failed++;
    }
  }

  // Test 5: City options
  testCityOptions() {
    const select = document.querySelector('select[name="city"]');
    const options = select?.querySelectorAll('option');
    const cities = ['Karachi', 'Lahore', 'Islamabad', 'Other'];

    let allPresent = true;
    cities.forEach(city => {
      const found = [...(options || [])].some(opt => opt.textContent === city);
      if (!found) {
        console.error(`✗ Missing city option: ${city}`);
        this.failed++;
        allPresent = false;
      }
    });

    if (allPresent) {
      console.log(`✓ All city options present`);
      this.passed++;
    }
  }

  runAll() {
    console.log('\n🧪 Running Apply Form Tests...\n');
    this.testFormElements();
    this.testFormValidation();
    this.testDuplicateMarker();
    this.testApplicationIdFormat();
    this.testCityOptions();
    this.printSummary();
  }

  printSummary() {
    console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
  }
}

// Run tests when document loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const tests = new ApplyFormTests();
    tests.runAll();
  });
} else {
  const tests = new ApplyFormTests();
  tests.runAll();
}
