
# 2. Initialize a new Git repository
git init

# 3. Add all project files to staging
git add .

# 4. Commit the changes
git commit -m "Initial submission: Complete QA Assessment (Web, API, Mobile)"

# 5. Rename the default branch to 'main'
git branch -M main

# 6. Add your GitHub repository as the remote origin
# (We remove any existing origin first just in case, to prevent errors)
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/MohamedSamirAbd-Ellatif/QA_Automation_Assessment.git

# 7. Push the code to GitHub
git push -u origin main