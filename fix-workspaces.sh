#!/bin/bash
echo "🔧 Fixing workspace issues..."

# Create all package.json files
mkdir -p apps/web apps/mobile packages/database packages/types packages/utils

echo '{"name":"@therabrake/web","version":"0.1.0","private":true,"scripts":{"dev":"next dev","build":"next build"}}' > apps/web/package.json
echo '{"name":"@therabrake/mobile","version":"0.1.0","private":true}' > apps/mobile/package.json  
echo '{"name":"@therabrake/database","version":"0.1.0","private":true,"main":"index.ts"}' > packages/database/package.json
echo '{"name":"@therabrake/types","version":"0.1.0","private":true,"main":"index.ts"}' > packages/types/package.json
echo '{"name":"@therabrake/utils","version":"0.1.0","private":true,"main":"index.ts"}' > packages/utils/package.json

# Create placeholder files
echo "export {};" > packages/database/index.ts
echo "export {};" > packages/types/index.ts
echo "export {};" > packages/utils/index.ts

# Clean and reinstall
rm -rf node_modules package-lock.json
npm install

echo "✅ Fixed! Now setting up Next.js..."
cd apps/web && npx create-next-app@latest . --typescript --tailwind --app --src-dir=false
