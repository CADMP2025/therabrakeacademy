#!/bin/bash

echo "🧹 Cleaning node_modules and lock files..."
rm -rf node_modules
rm -f package-lock.json

echo "📦 Installing fresh packages..."
npm install

echo "🔍 Auditing for vulnerabilities..."
npm audit fix

echo "✅ Packages updated successfully!"
echo ""
echo "Now run: npm run build"
