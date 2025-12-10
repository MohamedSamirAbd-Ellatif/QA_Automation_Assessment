#!/bin/bash

# 1. Clear the problematic npx cache
echo "Clearing npx cache..."
rm -rf ~/.npm/_npx

# 2. Re-install project dependencies to ensure a clean tree
echo "Refreshing local dependencies..."
rm -rf node_modules
rm -f package-lock.json
npm install

# 3. Verify Appium works now
echo "Starting Appium..."
npx appium --version

echo "----------------------------------------------------"
echo "Fix complete. You can now run 'npx appium' to start the server."
echo "----------------------------------------------------"