#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('💰 Expense Tracker Setup');
console.log('========================\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  const envExample = fs.readFileSync(path.join(__dirname, 'env'), 'utf8');
  fs.writeFileSync(envPath, envExample);
  console.log('✅ .env file created! Please edit it with your configuration.\n');
} else {
  console.log('✅ .env file already exists.\n');
}

// Check if node_modules exists
const clientNodeModules = path.join(__dirname, 'client', 'node_modules');
const serverNodeModules = path.join(__dirname, 'node_modules');

if (!fs.existsSync(clientNodeModules) || !fs.existsSync(serverNodeModules)) {
  console.log('📦 Installing dependencies...');
  console.log('Run: npm run install-all');
  console.log('This will install both backend and frontend dependencies.\n');
} else {
  console.log('✅ Dependencies are installed.\n');
}

console.log('🚀 Next Steps:');
console.log('1. Edit .env file with your MongoDB URI and Gmail credentials');
console.log('2. Run: npm run install-all (if not done already)');
console.log('3. Run: npm run dev');
console.log('4. Open http://localhost:3000 in your browser\n');

console.log('📱 PWA Features:');
console.log('- The app is installable on mobile devices');
console.log('- Works offline with service worker');
console.log('- Add to home screen for app-like experience\n');

console.log('📧 Email Setup:');
console.log('- Enable 2FA on your Gmail account');
console.log('- Generate an App Password for mail');
console.log('- Use the app password in EMAIL_PASS\n');

console.log('🎯 Features:');
console.log('- Add expenses with name, note, amount, and date');
console.log('- View all expenses in chronological order');
console.log('- Monthly summary with split calculations');
console.log('- Automated monthly email reports');
console.log('- Mobile-friendly responsive design\n');

console.log('Happy expense tracking! 💚'); 