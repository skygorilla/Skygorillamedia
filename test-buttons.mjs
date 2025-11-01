// Button Diagnostic Report
console.log('🔍 BUTTON DIAGNOSTIC REPORT\n');

const buttons = [
  // Hero Section Buttons
  { id: 'hero-calculate', file: 'hero-section.tsx:33', issues: ['Missing click handler', 'No aria-label'] },
  { id: 'hero-models', file: 'hero-section.tsx:34', issues: ['Missing click handler', 'No aria-label'] },
  
  // Calculator Buttons  
  { id: 'calc-mini', file: 'calculator.tsx:175', issues: ['Missing click handler'] },
  { id: 'calc-standard', file: 'calculator.tsx:176', issues: ['Missing click handler'] },
  { id: 'calc-partner', file: 'calculator.tsx:177', issues: ['Missing click handler'] },
  { id: 'calc-reset', file: 'calculator.tsx:198', issues: ['Missing click handler'] },
  
  // DevTools Buttons
  { id: 'devtools-gear', file: 'pitch/page.tsx:95', issues: [] },
  { id: 'devtools-close', file: 'pitch/page.tsx:150', issues: [] },
  { id: 'devtools-tabs', file: 'pitch/page.tsx:120-130', issues: [] },
  { id: 'console-clear', file: 'pitch/page.tsx:280', issues: [] },
  { id: 'inspect-btn', file: 'pitch/page.tsx:190', issues: [] },
  { id: 'debug-controls', file: 'pitch/page.tsx:350-360', issues: [] },
  
  // Config Fixer
  { id: 'config-fix', file: 'config-fixer.tsx:40', issues: [] },
  
  // UI Components
  { id: 'ui-button', file: 'ui/button.tsx', issues: [] },
  { id: 'carousel-prev', file: 'ui/carousel.tsx:204', issues: [] },
  { id: 'carousel-next', file: 'ui/carousel.tsx:227', issues: [] }
];

console.log(`Total buttons found: ${buttons.length}\n`);

let working = 0;
let broken = 0;

buttons.forEach((btn, i) => {
  const status = btn.issues.length === 0 ? '✅' : '❌';
  console.log(`${i + 1}. ${btn.id} ${status}`);
  console.log(`   File: ${btn.file}`);
  if (btn.issues.length > 0) {
    console.log(`   Issues: ${btn.issues.join(', ')}`);
    broken++;
  } else {
    working++;
  }
  console.log('');
});

console.log('📊 SUMMARY:');
console.log(`✅ Working: ${working}`);
console.log(`❌ Issues: ${broken}`);
console.log(`Success rate: ${((working / buttons.length) * 100).toFixed(1)}%`);