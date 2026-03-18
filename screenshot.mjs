import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:4321', { waitUntil: 'networkidle0', timeout: 10000 });

// Trigger all fade-in animations
await page.evaluate(() => {
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
});
await new Promise(r => setTimeout(r, 800));

await page.screenshot({ path: '/Users/zop/thesmartbees/screenshot-full.png', fullPage: true });
console.log('Full page screenshot saved');

// Hero shot
await page.screenshot({ path: '/Users/zop/thesmartbees/screenshot-hero.png' });
console.log('Hero screenshot saved');

// Scroll to services section
await page.evaluate(() => document.getElementById('services')?.scrollIntoView());
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: '/Users/zop/thesmartbees/screenshot-services.png' });
console.log('Services screenshot saved');

// Scroll to case studies
await page.evaluate(() => document.getElementById('case-studies')?.scrollIntoView());
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: '/Users/zop/thesmartbees/screenshot-cases.png' });
console.log('Case studies screenshot saved');

// Scroll to bottom CTA
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: '/Users/zop/thesmartbees/screenshot-bottom.png' });
console.log('Bottom screenshot saved');

await browser.close();
