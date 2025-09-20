#!/bin/bash

echo "🧪 Testing build locally..."

# Clear Next.js cache
rm -rf .next

# Run type checking
echo "📝 Running type check..."
npm run type-check || npx tsc --noEmit

# Run linting
echo "🔍 Running lint..."
npm run lint || npx next lint

# Run build
echo "🏗️ Running build..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
else
  echo "❌ Build failed. Check the errors above."
  exit 1
fi
