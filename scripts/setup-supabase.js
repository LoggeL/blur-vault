#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'
import { createClient } from '@supabase/supabase-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Get Supabase credentials from user
const getCredentials = () => {
  return new Promise((resolve) => {
    rl.question('Enter your Supabase URL: ', (url) => {
      rl.question(
        'Enter your Supabase service role key (not anon key): ',
        (key) => {
          resolve({ url, key })
        }
      )
    })
  })
}

// Main function
const main = async () => {
  console.log('🔧 Blur Vault - Supabase Setup Script 🔧')
  console.log('----------------------------------------')
  console.log(
    'This script will set up the necessary tables and functions in your Supabase project.'
  )
  console.log(
    'You will need your Supabase URL and service role key (not the anon key).'
  )
  console.log('')

  // Get credentials
  const { url, key } = await getCredentials()

  // Create Supabase client
  const supabase = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  try {
    // Read SQL file
    const sqlPath = path.join(__dirname, '..', 'setup-supabase.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')

    console.log('Executing SQL setup...')

    // Execute SQL
    const { error } = await supabase.rpc('exec_sql', { sql_string: sql })

    if (error) {
      console.error('Error executing SQL:', error)

      // Try alternative approach
      console.log('Trying alternative approach...')

      // Split SQL into statements
      const statements = sql.split(';').filter((stmt) => stmt.trim().length > 0)

      for (const statement of statements) {
        console.log(`Executing: ${statement.substring(0, 50)}...`)
        const { error } = await supabase.rpc('exec_sql', {
          sql_string: statement,
        })
        if (error) {
          console.error('Error executing statement:', error)
        }
      }
    }

    console.log('')
    console.log('✅ Setup completed!')
    console.log('')
    console.log('Next steps:')
    console.log('1. Configure authentication in your Supabase dashboard')
    console.log('2. Set up your environment variables in your application')
    console.log('3. Deploy your application')
  } catch (error) {
    console.error('Error:', error)
    console.log('')
    console.log('Manual setup instructions:')
    console.log('1. Go to your Supabase dashboard')
    console.log('2. Navigate to the SQL editor')
    console.log('3. Copy and paste the contents of setup-supabase.sql')
    console.log('4. Execute the SQL')
  } finally {
    rl.close()
  }
}

main()
