#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const checks = [
  {
    name: 'Firebase CLI',
    test: () => execSync('firebase --version', { encoding: 'utf8' }).trim(),
    fix: () => execSync('npm install -g firebase-tools@latest')
  },
  {
    name: 'Node/NPM',
    test: () => {
      const node = execSync('node --version', { encoding: 'utf8' }).trim();
      const npm = execSync('npm --version', { encoding: 'utf8' }).trim();
      return `Node ${node}, NPM ${npm}`;
    }
  },
  {
    name: 'Build ID',
    test: () => {
      const buildIdPath = path.join(__dirname, '../build-id.json');
      if (!fs.existsSync(buildIdPath)) {
        throw new Error('build-id.json missing');
      }
      const buildId = JSON.parse(fs.readFileSync(buildIdPath, 'utf8'));
      return `Build ID: ${buildId.id}`;
    },
    fix: () => {
      const buildId = {
        id: Date.now().toString(36),
        timestamp: new Date().toISOString(),
        version: require('../package.json').version
      };
      fs.writeFileSync(path.join(__dirname, '../build-id.json'), JSON.stringify(buildId, null, 2));
    }
  }
];

async function runHealthCheck() {
  console.log('🔍 Running health check...\n');
  
  let failed = false;
  
  for (const check of checks) {
    try {
      const result = check.test();
      console.log(`✅ ${check.name}: ${result}`);
    } catch (error) {
      console.log(`❌ ${check.name}: ${error.message}`);
      
      if (check.fix) {
        try {
          console.log(`🔧 Fixing ${check.name}...`);
          check.fix();
          const result = check.test();
          console.log(`✅ ${check.name}: ${result} (fixed)`);
        } catch (fixError) {
          console.log(`💥 Failed to fix ${check.name}: ${fixError.message}`);
          failed = true;
        }
      } else {
        failed = true;
      }
    }
  }
  
  if (failed) {
    console.log('\n❌ Health check failed');
    process.exit(1);
  } else {
    console.log('\n✅ All health checks passed');
  }
}

runHealthCheck().catch(error => {
  console.error('Health check error:', error);
  process.exit(1);
});