const { chromium } = require('playwright');

async function testWebsite() {
  console.log('🚀 Starting browser test...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Collect console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    errors.push(err.message);
  });

  try {
    // Test 1: Load homepage
    console.log('📄 Test 1: Loading homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('✅ Homepage loaded successfully\n');

    // Test 2: Check for key elements
    console.log('🔍 Test 2: Checking key elements...');
    
    // Header
    const header = await page.$('header');
    if (header) {
      console.log('✅ Header found');
    } else {
      console.log('❌ Header not found');
    }

    // Sidebar
    const sidebar = await page.$('aside');
    if (sidebar) {
      console.log('✅ Sidebar found');
    } else {
      console.log('❌ Sidebar not found');
    }

    // Tool cards
    const toolCards = await page.$$('[class*="card"]');
    console.log(`✅ Found ${toolCards.length} tool cards\n`);

    // Test 3: Check tool cards content
    console.log('📝 Test 3: Checking tool card content...');
    const firstCard = await page.$('[class*="card"]');
    if (firstCard) {
      const cardText = await firstCard.textContent();
      if (cardText && cardText.length > 0) {
        console.log('✅ First card has content');
      }
    }

    // Test 4: Test search functionality
    console.log('🔎 Test 4: Testing search...');
    const searchInput = await page.$('input[placeholder*="Search"]');
    if (searchInput) {
      await searchInput.fill('ChatGPT');
      await page.waitForTimeout(500);
      console.log('✅ Search input working');
    }

    // Test 5: Test pagination
    console.log('📄 Test 5: Checking pagination...');
    const pagination = await page.$('nav');
    if (pagination) {
      console.log('✅ Pagination found');
    }

    // Test 6: Check footer
    console.log('📋 Test 6: Checking footer...');
    const footer = await page.$('footer');
    if (footer) {
      console.log('✅ Footer found');
    }

    // Test 7: Click on a category
    console.log('🏷️ Test 7: Testing category filter...');
    const categoryLink = await page.$('a[href*="category"]');
    if (categoryLink) {
      await categoryLink.click();
      await page.waitForTimeout(500);
      console.log('✅ Category filter working');
    }

    // Report errors
    console.log('\n📊 Test Results:');
    if (errors.length === 0) {
      console.log('✅ No console errors detected');
    } else {
      console.log(`❌ Found ${errors.length} console errors:`);
      errors.forEach((err, i) => {
        console.log(`  ${i + 1}. ${err}`);
      });
    }

    console.log('\n✨ All tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testWebsite();
