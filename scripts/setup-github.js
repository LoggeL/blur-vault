#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Get GitHub repository information
const getRepoInfo = () => {
  return new Promise((resolve) => {
    rl.question('Enter your GitHub username: ', (username) => {
      rl.question('Enter your repository name: ', (repo) => {
        resolve({ username, repo });
      });
    });
  });
};

// Get Supabase credentials
const getSupabaseCredentials = () => {
  return new Promise((resolve) => {
    rl.question('Enter your Supabase URL: ', (url) => {
      rl.question('Enter your Supabase anon key: ', (key) => {
        resolve({ url, key });
      });
    });
  });
};

// Check if GitHub CLI is installed
const checkGitHubCLI = () => {
  return new Promise((resolve) => {
    exec('gh --version', (error) => {
      resolve(!error);
    });
  });
};

// Set GitHub repository secrets
const setGitHubSecrets = (username, repo, supabaseUrl, supabaseKey) => {
  return new Promise((resolve) => {
    console.log('Setting GitHub repository secrets...');

    exec(
      `gh secret set SUPABASE_URL -b "${supabaseUrl}" -R ${username}/${repo}`,
      (error) => {
        if (error) {
          console.error('Error setting SUPABASE_URL:', error);
          resolve(false);
          return;
        }

        exec(
          `gh secret set SUPABASE_KEY -b "${supabaseKey}" -R ${username}/${repo}`,
          (error) => {
            if (error) {
              console.error('Error setting SUPABASE_KEY:', error);
              resolve(false);
              return;
            }

            resolve(true);
          }
        );
      }
    );
  });
};

// Generate .env file
const generateEnvFile = (supabaseUrl, supabaseKey) => {
  const envContent = `NUXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NUXT_PUBLIC_SUPABASE_KEY=${supabaseKey}`;

  const envPath = path.join(__dirname, '..', '.env');
  fs.writeFileSync(envPath, envContent);
  console.log(`Environment file created at ${envPath}`);
};

// Main function
const main = async () => {
  console.log('🚀 Blur Vault - GitHub Setup Script 🚀');
  console.log('--------------------------------------');
  console.log(
    'This script will help you set up GitHub repository secrets for deployment.'
  );
  console.log('');

  // Get repository information
  const { username, repo } = await getRepoInfo();

  // Get Supabase credentials
  const { url, key } = await getSupabaseCredentials();

  // Generate .env file
  generateEnvFile(url, key);

  // Check if GitHub CLI is installed
  const hasGitHubCLI = await checkGitHubCLI();

  if (hasGitHubCLI) {
    // Set GitHub repository secrets
    const success = await setGitHubSecrets(username, repo, url, key);

    if (success) {
      console.log('');
      console.log('✅ GitHub repository secrets set successfully!');
    } else {
      console.log('');
      console.log('❌ Failed to set GitHub repository secrets.');
      console.log(
        'Please set them manually in your GitHub repository settings.'
      );
    }
  } else {
    console.log('');
    console.log(
      'GitHub CLI not found. Please install it or set secrets manually:'
    );
    console.log('1. Go to your GitHub repository settings');
    console.log('2. Navigate to Secrets and variables > Actions');
    console.log('3. Add the following repository secrets:');
    console.log(`   - SUPABASE_URL: ${url}`);
    console.log(`   - SUPABASE_KEY: ${key}`);
  }

  console.log('');
  console.log('Next steps:');
  console.log('1. Push your code to GitHub');
  console.log(
    '2. GitHub Actions will automatically build and deploy your application'
  );
  console.log('3. Configure GitHub Pages in your repository settings');

  rl.close();
};

main();
