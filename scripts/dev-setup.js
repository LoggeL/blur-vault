#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'
import { exec } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Get Supabase credentials
const getSupabaseCredentials = () => {
  return new Promise((resolve) => {
    rl.question('Enter your Supabase URL: ', (url) => {
      rl.question('Enter your Supabase anon key: ', (key) => {
        resolve({ url, key })
      })
    })
  })
}

// Generate .env file
const generateEnvFile = (supabaseUrl, supabaseKey) => {
  const envContent = `NUXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NUXT_PUBLIC_SUPABASE_KEY=${supabaseKey}`

  const envPath = path.join(__dirname, '..', '.env')
  fs.writeFileSync(envPath, envContent)
  console.log(`Environment file created at ${envPath}`)
}

// Create models directory if it doesn't exist
const createModelsDirectory = () => {
  const modelsPath = path.join(__dirname, '..', 'public', 'models')

  if (!fs.existsSync(modelsPath)) {
    fs.mkdirSync(modelsPath, { recursive: true })
    console.log(`Created models directory at ${modelsPath}`)
  }
}

// Check if model files exist
const checkModelFiles = () => {
  const modelsPath = path.join(__dirname, '..', 'public', 'models')
  const manifestFile = path.join(
    modelsPath,
    'tiny_face_detector_model-weights_manifest.json'
  )
  const shardFile = path.join(modelsPath, 'tiny_face_detector_model-shard1')

  return fs.existsSync(manifestFile) && fs.existsSync(shardFile)
}

// Install dependencies
const installDependencies = () => {
  return new Promise((resolve) => {
    console.log('Installing dependencies...')

    exec('npm install', { cwd: path.join(__dirname, '..') }, (error) => {
      if (error) {
        console.error('Error installing dependencies:', error)
        resolve(false)
        return
      }

      console.log('Dependencies installed successfully')
      resolve(true)
    })
  })
}

// Main function
const main = async () => {
  console.log('🔧 Blur Vault - Development Setup Script 🔧')
  console.log('------------------------------------------')
  console.log(
    'This script will help you set up your local development environment.'
  )
  console.log('')

  // Get Supabase credentials
  const { url, key } = await getSupabaseCredentials()

  // Generate .env file
  generateEnvFile(url, key)

  // Create models directory
  createModelsDirectory()

  // Check if model files exist
  const modelsExist = checkModelFiles()

  if (!modelsExist) {
    console.log('')
    console.log('⚠️ Face detection model files not found.')
    console.log(
      'Please make sure the following files exist in the public/models directory:'
    )
    console.log('- tiny_face_detector_model-weights_manifest.json')
    console.log('- tiny_face_detector_model-shard1')
  }

  // Ask if user wants to install dependencies
  rl.question(
    'Do you want to install dependencies? (y/n): ',
    async (answer) => {
      if (answer.toLowerCase() === 'y') {
        await installDependencies()
      }

      console.log('')
      console.log('✅ Development setup completed!')
      console.log('')
      console.log('Next steps:')
      console.log('1. Run `npm run dev` to start the development server')
      console.log('2. Open your browser and navigate to http://localhost:3000')

      rl.close()
    }
  )
}

main()
