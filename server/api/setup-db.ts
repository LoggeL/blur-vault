import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event)

    // Create user_credits table if it doesn't exist
    const { error: userCreditsError } = await client.rpc(
      'create_table_if_not_exists',
      {
        table_name: 'user_credits',
        table_definition: `
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
        credits integer DEFAULT 5,
        is_admin boolean DEFAULT false,
        created_at timestamp with time zone DEFAULT now(),
        updated_at timestamp with time zone DEFAULT now()
      `,
      }
    )

    if (userCreditsError) throw userCreditsError

    // Create processing_history table if it doesn't exist
    const { error: historyError } = await client.rpc(
      'create_table_if_not_exists',
      {
        table_name: 'processing_history',
        table_definition: `
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
        timestamp timestamp with time zone DEFAULT now(),
        faces_detected integer DEFAULT 0,
        thumbnail_url text,
        created_at timestamp with time zone DEFAULT now()
      `,
      }
    )

    if (historyError) throw historyError

    // Set up RLS (Row Level Security) policies
    // For user_credits table
    await client.query(`
      ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY "Users can view their own credits"
        ON user_credits FOR SELECT
        USING (auth.uid() = user_id);
        
      CREATE POLICY "Users can update their own credits"
        ON user_credits FOR UPDATE
        USING (auth.uid() = user_id);
    `)

    // For processing_history table
    await client.query(`
      ALTER TABLE processing_history ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY "Users can view their own history"
        ON processing_history FOR SELECT
        USING (auth.uid() = user_id);
        
      CREATE POLICY "Users can insert their own history"
        ON processing_history FOR INSERT
        WITH CHECK (auth.uid() = user_id);
    `)

    return { success: true, message: 'Database setup completed successfully' }
  } catch (error) {
    console.error('Database setup error:', error)
    return { success: false, error: error.message }
  }
})
