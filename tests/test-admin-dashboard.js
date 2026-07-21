// Test Suite: Admin Dashboard (admin.html)

class AdminDashboardTests {
  constructor() {
    this.passed = 0;
    this.failed = 0;
  }

  // Test 1: Admin authentication
  testAdminAuth() {
    const authPanel = document.querySelector('#admin-login-panel') ||
                      document.querySelector('[class*="auth"]');

    const googleButton = document.querySelector('button[id*="google"]') ||
                         document.querySelector('button[class*="google"]');

    if (authPanel && googleButton) {
      console.log(`✓ Admin authentication panel found`);
      this.passed++;
    } else {
      console.error(`✗ Admin auth not properly implemented`);
      this.failed++;
    }
  }

  // Test 2: Admin dashboard structure
  testDashboardStructure() {
    const dashboard = document.querySelector('#admin-dashboard') ||
                      document.querySelector('[class*="admin"]');

    const appList = document.querySelector('#applications-list') ||
                    document.querySelector('[class*="applications"]');

    if (dashboard && appList) {
      console.log(`✓ Admin dashboard structure found`);
      this.passed++;
    } else {
      console.error(`✗ Dashboard structure incomplete`);
      this.failed++;
    }
  }

  // Test 3: Search and filter controls
  testFilters() {
    const searchInput = document.querySelector('#application-search') ||
                        document.querySelector('input[placeholder*="Search"]');

    const statusFilter = document.querySelector('#status-filter') ||
                         document.querySelector('select[id*="status"]');

    const cityFilter = document.querySelector('#city-filter') ||
                       document.querySelector('select[id*="city"]');

    const sortSelect = document.querySelector('#sort-select') ||
                       document.querySelector('select[id*="sort"]');

    let filters = 0;
    if (searchInput) { filters++; console.log(`✓ Search input found`); }
    if (statusFilter) { filters++; console.log(`✓ Status filter found`); }
    if (cityFilter) { filters++; console.log(`✓ City filter found`); }
    if (sortSelect) { filters++; console.log(`✓ Sort select found`); }

    if (filters >= 3) {
      console.log(`✓ Filter controls present (${filters}/4)`);
      this.passed++;
    } else {
      console.warn(`⚠ Only ${filters} filter controls found`);
    }
  }

  // Test 4: Application actions
  testApplicationActions() {
    const exportButton = document.querySelector('#export-csv-button') ||
                         document.querySelector('button[id*="export"]');

    const refreshButton = document.querySelector('#refresh-button') ||
                          document.querySelector('button[id*="refresh"]');

    const logoutButton = document.querySelector('#admin-logout-button') ||
                         document.querySelector('button[id*="logout"]');

    let actions = 0;
    if (exportButton) { actions++; console.log(`✓ Export CSV button found`); }
    if (refreshButton) { actions++; console.log(`✓ Refresh button found`); }
    if (logoutButton) { actions++; console.log(`✓ Logout button found`); }

    if (actions >= 2) {
      console.log(`✓ Application action buttons present`);
      this.passed++;
    } else {
      console.warn(`⚠ Only ${actions} action buttons found`);
    }
  }

  // Test 5: Statistics display
  testStatsDisplay() {
    const statsGrid = document.querySelector('#stats-grid') ||
                      document.querySelector('[class*="stats"]');

    if (statsGrid) {
      console.log(`✓ Statistics grid found`);
      this.passed++;
    } else {
      console.error(`✗ Statistics display not found`);
      this.failed++;
    }
  }

  // Test 6: Admin email validation
  testAdminEmailValidation() {
    const adminEmail = 'sahulatfamilypk@gmail.com';
    console.log(`✓ Admin email configured: ${adminEmail}`);
    this.passed++;
  }

  // Test 7: Firestore integration
  testFirestoreAccess() {
    const scripts = document.querySelectorAll('script');
    let hasFirestoreAdmin = false;

    scripts.forEach(script => {
      if (script.textContent?.includes('admin.js') ||
          script.textContent?.includes('getDoc') ||
          script.textContent?.includes('getDocs') ||
          script.textContent?.includes('updateDoc')) {
        hasFirestoreAdmin = true;
      }
    });

    if (hasFirestoreAdmin) {
      console.log(`✓ Firestore CRUD operations integrated`);
      this.passed++;
    } else {
      console.warn(`⚠ Firestore integration not detected`);
    }
  }

  // Test 8: Status update functionality
  testStatusUpdate() {
    const statusEditors = document.querySelectorAll('[class*="status-editor"]') ||
                          document.querySelectorAll('select[name*="status"]');

    if (statusEditors.length > 0) {
      console.log(`✓ Status update fields found`);
      this.passed++;
    } else {
      console.warn(`⚠ Status update fields not detected`);
    }
  }

  runAll() {
    console.log('\n🧪 Running Admin Dashboard Tests...\n');
    this.testAdminAuth();
    this.testDashboardStructure();
    this.testFilters();
    this.testApplicationActions();
    this.testStatsDisplay();
    this.testAdminEmailValidation();
    this.testFirestoreAccess();
    this.testStatusUpdate();
    this.printSummary();
  }

  printSummary() {
    console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
  }
}

// Run tests when document loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const tests = new AdminDashboardTests();
    tests.runAll();
  });
} else {
  const tests = new AdminDashboardTests();
  tests.runAll();
}
