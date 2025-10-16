#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Required environment variables
const REQUIRED_VARS = {
  // NextAuth
  NEXTAUTH_URL: {
    description: 'Next.js app URL for authentication',
    example: 'http://localhost:3000',
    required: true,
  },
  NEXTAUTH_SECRET: {
    description: 'Secret for NextAuth.js (generate with: openssl rand -base64 32)',
    example: 'your-secret-key-here',
    required: true,
  },

  // Optional OAuth Providers
  GITHUB_ID: {
    description: 'GitHub OAuth Client ID',
    example: 'your-github-client-id',
    required: false,
  },
  GITHUB_SECRET: {
    description: 'GitHub OAuth Client Secret',
    example: 'your-github-client-secret',
    required: false,
  },
  GOOGLE_ID: {
    description: 'Google OAuth Client ID',
    example: 'your-google-client-id.apps.googleusercontent.com',
    required: false,
  },
  GOOGLE_SECRET: {
    description: 'Google OAuth Client Secret',
    example: 'your-google-client-secret',
    required: false,
  },

  // Monitoring (Optional)
  NEXT_PUBLIC_SENTRY_DSN: {
    description: 'Sentry DSN for error tracking',
    example: 'https://xxx@xxx.ingest.sentry.io/xxx',
    required: false,
  },
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateEnvironment() {
  log('\n🔍 Validating Environment Variables...\n', 'bold');

  const envPath = path.join(process.cwd(), '.env.local');
  const envExamplePath = path.join(process.cwd(), '.env.example');

  // Check if .env.local exists
  if (!fs.existsSync(envPath)) {
    log('❌ Error: .env.local file not found!\n', 'red');

    if (fs.existsSync(envExamplePath)) {
      log('💡 Quick Fix:', 'yellow');
      log('   1. Copy .env.example to .env.local:', 'cyan');
      log('      cp .env.example .env.local\n', 'cyan');
      log('   2. Fill in the required values\n', 'cyan');
    } else {
      log('💡 Create a .env.local file with required variables\n', 'yellow');
    }

    process.exit(1);
  }

  // Read .env.local
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};

  envContent.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  });

  // Validate variables
  let hasErrors = false;
  let hasWarnings = false;
  const missing = [];
  const empty = [];
  const optional = [];

  Object.entries(REQUIRED_VARS).forEach(([key, config]) => {
    const value = envVars[key] || process.env[key];

    if (!value || value === '') {
      if (config.required) {
        hasErrors = true;
        missing.push({ key, config });
      } else {
        hasWarnings = true;
        optional.push({ key, config });
      }
    } else if (value === config.example) {
      hasWarnings = true;
      empty.push({ key, config });
    }
  });

  // Report missing required variables
  if (missing.length > 0) {
    log('❌ Missing Required Variables:\n', 'red');
    missing.forEach(({ key, config }) => {
      log(`   ${key}`, 'bold');
      log(`   Description: ${config.description}`, 'cyan');
      log(`   Example: ${config.example}\n`, 'yellow');
    });
  }

  // Report placeholder values
  if (empty.length > 0) {
    log('⚠️  Variables Using Example/Placeholder Values:\n', 'yellow');
    empty.forEach(({ key, config }) => {
      log(`   ${key}`, 'bold');
      log(`   Current: ${config.example}`, 'yellow');
      log(`   Description: ${config.description}\n`, 'cyan');
    });
  }

  // Report optional missing variables
  if (optional.length > 0) {
    log('ℹ️  Optional Variables Not Set:\n', 'blue');
    optional.forEach(({ key, config }) => {
      log(`   ${key}`, 'bold');
      log(`   Description: ${config.description}`, 'cyan');
      log(`   Example: ${config.example}\n`, 'yellow');
    });
  }

  // Final summary
  log('\n' + '='.repeat(60) + '\n', 'cyan');

  if (hasErrors) {
    log('❌ VALIDATION FAILED', 'red');
    log('\nPlease fix the missing required variables above.\n', 'red');
    log('💡 Quick Tips:', 'yellow');
    log('   1. Update .env.local with real values', 'cyan');
    log('   2. For NEXTAUTH_SECRET, run:', 'cyan');
    log('      openssl rand -base64 32', 'yellow');
    log('   3. Check documentation for OAuth setup\n', 'cyan');
    process.exit(1);
  } else if (hasWarnings) {
    log('⚠️  VALIDATION PASSED WITH WARNINGS', 'yellow');
    log('\nYour app will run, but some features may not work.', 'yellow');
    log('Consider setting the optional variables above.\n', 'yellow');
    process.exit(0);
  } else {
    log('✅ VALIDATION PASSED', 'green');
    log('\nAll required environment variables are set!\n', 'green');
    process.exit(0);
  }
}

// Run validation
validateEnvironment();
