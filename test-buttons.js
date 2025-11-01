const { diagnoseAllButtons, runButtonTests } = require('./src/utils/buttonDiagnostic.ts');

console.log('🔍 BUTTON DIAGNOSTIC REPORT\n');

const buttons = diagnoseAllButtons();
console.log(`Total buttons found: ${buttons.length}\n`);

buttons.forEach((btn, i) => {
  console.log(`${i + 1}. ${btn.id}`);
  console.log(`   File: ${btn.file}:${btn.line}`);
  console.log(`   Type: ${btn.type}`);
  console.log(`   Issues: ${btn.issues.length > 0 ? btn.issues.join(', ') : 'None'}`);
  console.log('');
});

console.log('🧪 RUNNING BUTTON TESTS\n');

const testResults = runButtonTests();
console.log(`Tests passed: ${testResults.passed}`);
console.log(`Tests failed: ${testResults.failed}`);
console.log(`Success rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%\n`);

console.log('📊 DETAILED RESULTS:\n');
testResults.results.forEach(result => {
  console.log(`${result.id} (${result.score})`);
  console.log(`  Click Handler: ${result.tests.hasClickHandler ? '✅' : '❌'}`);
  console.log(`  Accessible: ${result.tests.isAccessible ? '✅' : '❌'}`);
  console.log(`  No Issues: ${result.tests.hasNoIssues ? '✅' : '❌'}`);
  if (result.issues.length > 0) {
    console.log(`  Issues: ${result.issues.join(', ')}`);
  }
  console.log('');
});