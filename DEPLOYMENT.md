# Deploying Blur Vault to GitHub Pages

This guide explains how to deploy the Blur Vault application to GitHub Pages with Supabase as the backend.

## Prerequisites

- A GitHub account
- A Supabase account with a project set up
- Your Supabase URL and API key

## Setup Using Helper Scripts

The application includes helper scripts to simplify the setup process:

### 1. Set up Supabase

Run the Supabase setup script to create the necessary tables and functions:

```bash
npm run setup-supabase
```

This script will:

- Prompt you for your Supabase URL and service role key
- Create the required tables (`user_credits` and `processing_history`)
- Set up row-level security policies
- Create the necessary functions

### 2. Set up GitHub Repository Secrets

Run the GitHub setup script to configure your repository secrets:

```bash
npm run setup-github
```

This script will:

- Prompt you for your GitHub username and repository name
- Prompt you for your Supabase URL and anon key
- Create a local `.env` file with your Supabase credentials
- Set up GitHub repository secrets if GitHub CLI is installed
- Provide manual instructions if GitHub CLI is not available

## Manual Setup

If you prefer to set up everything manually, follow these steps:

### 1. Push your code to a GitHub repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 2. Set up GitHub Repository Secrets

1. Go to your repository settings
2. Navigate to "Secrets and variables" > "Actions"
3. Add the following repository secrets:
   - `SUPABASE_URL`: Your Supabase project URL (e.g., `https://yourproject.supabase.co`)
   - `SUPABASE_KEY`: Your Supabase public API key (anon key)

### 3. Set up Supabase

1. Create a new Supabase project
2. Go to the SQL Editor in your Supabase dashboard
3. Copy the contents of `setup-supabase.sql` and execute it
4. Configure authentication settings in Supabase

## GitHub Actions Workflow

The repository includes a GitHub Actions workflow file (`.github/workflows/deploy.yml`) that automatically builds and deploys the application to GitHub Pages whenever you push to the main branch.

The workflow:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Creates an environment file with your Supabase credentials
5. Builds the application
6. Deploys to GitHub Pages

## Enabling GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages"
3. Under "Source", select "Deploy from a branch"
4. Select the `gh-pages` branch
5. Click "Save"

## Supabase Configuration

Make sure your Supabase project is properly configured:

1. Set up the required tables (`user_credits` and `processing_history`)
2. Run the SQL setup script in the Supabase SQL editor
3. Configure authentication settings in Supabase:
   - Go to Authentication > URL Configuration
   - Set the Site URL to your GitHub Pages URL (e.g., `https://username.github.io/CursorDemo/`)
   - Add the same URL to the Redirect URLs

## Custom Domain (Optional)

If you want to use a custom domain:

1. Update the `baseURL` in `nuxt.config.ts` to match your domain
2. Configure your custom domain in GitHub Pages settings
3. Update the Site URL and Redirect URLs in Supabase authentication settings
4. Uncomment and update the `CNAME` file in the `public` directory

## Troubleshooting

- If you encounter routing issues, make sure the `baseURL` in `nuxt.config.ts` matches your repository name
- Check the GitHub Actions logs for any build or deployment errors
- Verify that your Supabase credentials are correctly set as repository secrets
