#!/bin/bash

# Create logo directory if it doesn't exist
mkdir -p public/logo

# Check if logo files exist, if not create placeholders
if [ ! -f "public/logo/logo.png" ]; then
  echo "⚠️  Logo files not found. Creating placeholder files..."
  echo "Please replace these with your actual logo files."
  
  # Create placeholder text files
  echo "Replace with actual logo.png (main logo - 180x60px recommended)" > public/logo/logo.png.txt
  echo "Replace with actual logo-white.png (white version for dark backgrounds)" > public/logo/logo-white.png.txt
  echo "Replace with actual logo-small.png (32x32px favicon)" > public/logo/logo-small.png.txt
  echo "Replace with actual apple-touch-icon.png (180x180px)" > public/logo/apple-touch-icon.png.txt
  echo "Replace with actual android-chrome-icon.png (192x192px)" > public/logo/android-chrome-icon.png.txt
  
  echo "⚠️  Placeholder files created. Replace them with actual images."
fi

echo "✅ Logo directory ready at public/logo/"
