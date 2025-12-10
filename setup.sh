# 1. Load NVM (ensures nvm command is available)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 2. Install and Switch to Node.js 22
nvm install 22
nvm use 22
nvm alias default 22

# 3. Verify the version (Must show v22.x.x)
echo "Current Node Version: $(node -v)"

# 4. Clean Re-install Dependencies (REQUIRED after Node upgrade)
# Native modules like Appium drivers break when Node versions change, so we must rebuild.
rm -rf node_modules package-lock.json
npm install

# 5. Install the UiAutomator2 Driver (The missing piece!)
# This must be done after 'npm install' so the appium command is available.
npx appium driver install uiautomator2

# 6. Verify Driver Installation
npx appium driver list

# 7. Run Appium
npx appium