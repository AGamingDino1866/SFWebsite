# Success Factor - Test Suite

Automated test classes for the Success Factor scholarship portal.

## Test Files

### 1. `test-apply-form.js`
Tests the application form (apply.html)
- Form elements exist
- Form validation works
- Duplicate warning system
- Application ID generation format
- City options present

**How to use:**
Add this script to `apply.html` in the `<head>` or at end of `<body>`:
```html
<script src="../tests/test-apply-form.js"></script>
```

### 2. `test-status-lookup.js`
Tests the status lookup page (status.html)
- Status form exists
- Application ID input validation
- Status display structure
- Firestore integration
- Valid status values
- Public access (no auth required)

**How to use:**
Add this script to `status.html`:
```html
<script src="../tests/test-status-lookup.js"></script>
```

### 3. `test-ask-ai.js`
Tests the AI chat interface (ask-ai.html)
- Chat interface elements
- Message history display
- Rate limit information
- Firebase auth requirement
- Groq API endpoint
- Message input validation
- LLM settings (temperature, tokens)

**How to use:**
Add this script to `ask-ai.html`:
```html
<script src="../tests/test-ask-ai.js"></script>
```

### 4. `test-admin-dashboard.js`
Tests the admin dashboard (admin.html)
- Admin authentication
- Dashboard structure
- Search and filter controls
- Application action buttons
- Statistics display
- Admin email validation
- Firestore CRUD operations
- Status update functionality

**How to use:**
Add this script to `admin.html`:
```html
<script src="../tests/test-admin-dashboard.js"></script>
```

## Test Runner

### `test-runner.html`
Web-based test interface for running all tests at once.

**Access:** Open `test-runner.html` in a browser

**Features:**
- Run individual test suites
- Run all tests at once
- Clear output
- View test results with color coding
- Manual testing checklist

## Running Tests

### Option 1: Browser Console
1. Open any page (apply.html, status.html, etc.)
2. Open browser DevTools (F12)
3. Go to Console tab
4. Tests run automatically on page load

### Option 2: Test Runner
1. Open `tests/test-runner.html` in a browser
2. Click individual test buttons or "Run All Tests"
3. View results in the output panel

### Option 3: Headless Testing
Tests can be integrated with Playwright or Jest for CI/CD:

```bash
npx playwright test --config=tests/playwright.config.js
```

## Test Coverage

| Feature | Tests | Status |
|---------|-------|--------|
| Application Form | 5 | ✓ |
| Status Lookup | 6 | ✓ |
| Ask AI Chat | 7 | ✓ |
| Admin Dashboard | 8 | ✓ |
| **Total** | **26** | **✓** |

## Expected Output

Passing tests show:
```
✓ Form input exists: student_name
✓ Form input exists: city
✓ Application ID format is valid: SF2026-ABC12
```

Failing tests show:
```
✗ Missing form input: guardian_phone
✗ Failed to store duplicate marker
```

## Manual Testing Checklist

Before deployment, verify these manually:

- [ ] Application form submits and creates Firestore document
- [ ] Duplicate application warning appears on resubmit
- [ ] Status lookup returns correct application status
- [ ] AI chat sends messages to Groq API and returns responses
- [ ] Rate limiting works (150 requests/day per IP)
- [ ] Admin dashboard loads only with admin credentials
- [ ] Admin can search, filter, and update applications
- [ ] Export CSV downloads application data
- [ ] Site works on mobile devices (responsive)
- [ ] All pages load quickly (Cloudflare Pages cache)

## CI/CD Integration

To run tests in GitHub Actions:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test -- tests/
```

## Debugging Failed Tests

1. Check browser console for error messages
2. Verify HTML structure matches test expectations
3. Confirm Firebase/Firestore connectivity
4. Check that all required input fields are present
5. Verify CSS classes and IDs match test queries

## Adding New Tests

1. Create new test class in separate file
2. Export test class: `window.TestName = TestName`
3. Add to test-runner.html
4. Include in CI/CD pipeline

Example:
```javascript
class NewFeatureTests {
  runAll() {
    console.log('🧪 Running New Feature Tests...\n');
    // Add tests here
    this.printSummary();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new NewFeatureTests().runAll();
  });
}
```
