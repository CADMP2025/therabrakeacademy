#!/bin/bash

echo "🧪 Running TypeScript type check..."

# Clear cache
rm -rf .next

# Run type checking
echo "📝 Checking types..."
npx tsc --noEmit --incremental false

if [ $? -eq 0 ]; then
  echo "✅ Type check passed!"
else
  echo "❌ Type check failed. Fix the errors above."
  exit 1
fi

# Run linting
echo "🔍 Running lint..."
npm run lint

if [ $? -eq 0 ]; then
  echo "✅ Lint check passed!"
else
  echo "❌ Lint check failed. Fix the errors above."
  exit 1
fi

echo "✅ All checks passed!"
