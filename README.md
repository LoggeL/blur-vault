# Blur Vault - Cyberpunk Face Blurring Application

Blur Vault is a cyberpunk-themed web application that allows users to upload images and automatically detect and blur faces to protect privacy. The application features a credit system, user authentication, and a sleek cyberpunk design.

![Blur Vault](https://i.imgur.com/placeholder.jpg)

## Features

- 🔒 **Privacy Protection**: Automatically detect and blur faces in images
- 🧠 **AI-Powered**: Uses face-api.js for accurate face detection
- 👤 **User Accounts**: Authentication system with Supabase
- 💳 **Credit System**: Each user gets 5 credits (1 credit = 1 image)
- 🔧 **Admin Access**: First registered user becomes admin
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Cyberpunk Theme**: Sleek, futuristic UI with neon accents

## Tech Stack

- **Frontend**: Vue.js 3 with Nuxt 3
- **Styling**: TailwindCSS with DaisyUI
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Face Detection**: face-api.js
- **Image Processing**: Canvas API

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account

### Quick Setup

The easiest way to set up the application is to use the provided setup script:

```bash
npm run setup
```

This script will:

- Prompt you for your Supabase URL and anon key
- Create a `.env` file with your credentials
- Check for the required model files
- Optionally install dependencies

### Manual Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/blur-vault.git
   cd blur-vault
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Supabase:

   - Create a new Supabase project
   - Run the SQL from `setup-supabase.sql` in the Supabase SQL editor
   - Copy your Supabase URL and anon key

4. Configure environment variables:

   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     NUXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NUXT_PUBLIC_SUPABASE_KEY=your-supabase-anon-key
     ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

### Helper Scripts

The application includes several helper scripts to simplify setup and deployment:

- `npm run setup` - Set up local development environment
- `npm run setup-supabase` - Set up Supabase tables and functions
- `npm run setup-github` - Set up GitHub repository secrets for deployment
- `npm run deploy` - Build the application for deployment
- `npm run prepare-deploy` - Prepare the application for manual deployment

### Face Detection Models

The application uses face-api.js models for face detection. These models are loaded from the `/public/models` directory. The required model files are:

- `tiny_face_detector_model-weights_manifest.json`
- `tiny_face_detector_model-shard1`

## Deployment

### GitHub Pages Deployment

This application can be deployed to GitHub Pages with Supabase as the backend. A GitHub Actions workflow is included to automate the deployment process.

1. Push your code to a GitHub repository
2. Set up repository secrets:
   - Go to your repository settings > Secrets and variables > Actions
   - Add `SUPABASE_URL` and `SUPABASE_KEY` as repository secrets
3. The GitHub Actions workflow will automatically build and deploy the application to GitHub Pages when you push to the main branch
4. Configure Supabase authentication settings:
   - Set the Site URL to your GitHub Pages URL (e.g., `https://username.github.io/CursorDemo/`)
   - Add the same URL to the Redirect URLs

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Usage

1. Register an account (the first registered user becomes admin)
2. Log in to access the dashboard
3. Upload an image containing faces
4. The application will automatically detect and blur faces
5. Download the processed image
6. Each processed image costs 1 credit

## License

MIT

## Credits

- Face detection powered by [face-api.js](https://github.com/justadudewhohacks/face-api.js)
- UI components by [DaisyUI](https://daisyui.com/)
- Authentication and database by [Supabase](https://supabase.io/)
