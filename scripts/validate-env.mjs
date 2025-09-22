#!/usr/bin/env node

/**
 * Environment variable validation script
 * Ensures all required environment variables are set
 */

const requiredEnvVars = [
  'SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL', 
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'CANVAS_TOKEN_KEY'
];

const optionalEnvVars = [
  'ENCRYPTION_KEY' // Legacy, will be replaced by CANVAS_TOKEN_KEY
];

console.log('🔍 Validating environment variables...\n');

let hasErrors = false;

// Check required variables
for (const varName of requiredEnvVars) {
  const value = process.env[varName];
  
  if (!value) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    hasErrors = true;
  } else {
    // Security check for service role key
    if (varName === 'SUPABASE_SERVICE_ROLE_KEY' && value.includes('NEXT_PUBLIC_')) {
      console.error(`❌ Security violation: ${varName} must not have NEXT_PUBLIC_ prefix`);
      hasErrors = true;
    } else {
      console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
    }
  }
}

// Check optional variables
for (const varName of optionalEnvVars) {
  const value = process.env[varName];
  if (value) {
    console.log(`⚠️  ${varName}: ${value.substring(0, 10)}... (optional, consider removing)`);
  }
}

// Validate CANVAS_TOKEN_KEY format
const canvasTokenKey = process.env.CANVAS_TOKEN_KEY;
if (canvasTokenKey) {
  try {
    const key = Buffer.from(canvasTokenKey, 'base64');
    if (key.length !== 32) {
      console.error(`❌ CANVAS_TOKEN_KEY must be a 32-byte base64-encoded key (got ${key.length} bytes)`);
      hasErrors = true;
    } else {
      console.log(`✅ CANVAS_TOKEN_KEY: Valid 32-byte base64 key`);
    }
  } catch (error) {
    console.error(`❌ CANVAS_TOKEN_KEY: Invalid base64 encoding`);
    hasErrors = true;
  }
}

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.error('❌ Environment validation failed. Please fix the errors above.');
  process.exit(1);
} else {
  console.log('✅ All environment variables are valid!');
  process.exit(0);
}
