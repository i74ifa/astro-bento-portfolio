---
layout: ../../layouts/LayoutBlogPost.astro
title: "How build Vite to SSH Server Using Github Action"
description: "Deploy automatically your static site VPS with Github Action"
pubDate: 2024-11-26
category: "intro"
---

# How build Vite to SSH Server Using Github Action

First of all, it's very simple to deploy your static site VPS with Github Action.

## How to use

1. Create a new repository on Github

2. Create a new file named `.github/workflows/ci.yml`

3. Add the following code:

```yaml
name: Deploy Vite Vue.js Project

on:
  push:
    branches:
      - dev/main  # Adjust the branch as per your workflow

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'  # Ensure Node.js version is compatible with Vite

    - name: Install dependencies
      run: npm ci

    - name: Build project
      run: npm run build

    - name: Set up SSH key
      uses: webfactory/ssh-agent@v0.5.3
      with:
        ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

    - name: Copy files via SCP
      run: |
        scp -o StrictHostKeyChecking=no -r dist/* ${{ secrets.SSH_USERNAME }}@${{ secrets.SSH_HOST }}:/var/www/frontend
```

4. Save the file

5. Commit the changes

6. Push the changes to the repository

7. Wait for the workflow to complete

8. Check the deployment status