<template>
  <div class="min-h-[80vh] flex flex-col justify-center items-center px-4">
    <div
      class="card w-full max-w-md bg-neutral shadow-xl border border-primary/30 overflow-hidden"
    >
      <!-- Card header with glitch effect -->
      <div class="bg-primary/10 p-6 text-center border-b border-primary/30">
        <h2 class="text-2xl font-bold font-orbitron">
          <span class="glitch-effect text-primary" data-text="ACCESS PORTAL"
            >ACCESS PORTAL</span
          >
        </h2>
      </div>

      <!-- Login/Register Form -->
      <div class="card-body">
        <div class="tabs tabs-boxed bg-neutral mb-6">
          <a
            @click="mode = 'login'"
            :class="[
              'tab',
              mode === 'login' ? 'tab-active bg-primary text-neutral' : '',
            ]"
            >Login</a
          >
          <a
            @click="mode = 'register'"
            :class="[
              'tab',
              mode === 'register' ? 'tab-active bg-primary text-neutral' : '',
            ]"
            >Register</a
          >
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base-content">Email</span>
            </label>
            <input
              type="email"
              v-model="email"
              placeholder="your-email@example.com"
              class="input input-bordered bg-neutral-focus border-accent/50 focus:border-accent"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text text-base-content">Password</span>
            </label>
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="input input-bordered bg-neutral-focus border-accent/50 focus:border-accent"
              required
            />
            <label v-if="mode === 'login'" class="label">
              <a
                @click="mode = 'resetPassword'"
                class="label-text-alt link link-hover text-accent"
                >Forgot password?</a
              >
            </label>
          </div>

          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="loading loading-spinner"></span>
              <span v-else>{{ submitButtonText }}</span>
            </button>
          </div>

          <div v-if="errorMsg" class="alert alert-error mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ errorMsg }}</span>
          </div>

          <div v-if="successMsg" class="alert alert-success mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ successMsg }}</span>
          </div>
        </form>

        <!-- Reset password form -->
        <div v-if="mode === 'resetPassword'" class="mt-6">
          <div class="divider">Reset Password</div>
          <form @submit.prevent="handlePasswordReset">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-base-content">Email</span>
              </label>
              <input
                type="email"
                v-model="resetEmail"
                placeholder="your-email@example.com"
                class="input input-bordered bg-neutral-focus border-accent/50 focus:border-accent"
                required
              />
            </div>

            <div class="form-control mt-6">
              <button
                type="submit"
                class="btn btn-accent"
                :disabled="resetLoading"
              >
                <span
                  v-if="resetLoading"
                  class="loading loading-spinner"
                ></span>
                <span v-else>Send Reset Link</span>
              </button>
            </div>

            <div class="form-control mt-4">
              <button
                type="button"
                @click="mode = 'login'"
                class="btn btn-ghost btn-sm"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Cyberpunk decoration at the bottom -->
      <div
        class="h-2 bg-gradient-to-r from-primary via-accent to-secondary"
      ></div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// If user is already logged in, redirect to dashboard
watchEffect(() => {
  if (user.value) {
    router.push('/dashboard')
  }
})

// Form state
const mode = ref('login')
const email = ref('')
const password = ref('')
const resetEmail = ref('')
const loading = ref(false)
const resetLoading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

// Computed properties
const submitButtonText = computed(() => {
  return mode.value === 'login' ? 'Login' : 'Register'
})

// Form handlers
const handleSubmit = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  loading.value = true

  try {
    if (mode.value === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })

      if (error) throw error

      // Redirect handled by the watcher
    } else {
      // Register mode
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })

      if (error) throw error

      // Create user_credits record for the new user
      await initializeUserCredits()

      successMsg.value =
        'Registration successful! Check your email for confirmation.'
      // Switch to login mode after successful registration
      mode.value = 'login'
    }
  } catch (error) {
    errorMsg.value = error.message || 'An error occurred.'
  } finally {
    loading.value = false
  }
}

// Initialize user credits when a new user registers
const initializeUserCredits = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session?.user) {
      console.error('No user session found')
      return
    }

    // First, ensure tables exist
    const { error: rpcError } = await supabase.rpc('ensure_tables_exist')
    if (rpcError) {
      console.error('Error ensuring tables exist:', rpcError)
    }

    // Check if user already has credits record
    const { data: existingRecord, error: checkError } = await supabase
      .from('user_credits')
      .select('id')
      .eq('user_id', session.user.id)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" error
      console.error('Error checking existing user credits:', checkError)
      return
    }

    // If record already exists, don't create a new one
    if (existingRecord) {
      console.log('User credits record already exists')
      return
    }

    // Check if this is the first user (to make them admin)
    const { count, error: countError } = await supabase
      .from('user_credits')
      .select('*', { count: 'exact', head: true })

    const isFirstUser = !countError && count === 0

    // Insert user credits record
    const { error: insertError } = await supabase.from('user_credits').insert([
      {
        user_id: session.user.id,
        credits: 5, // Each user gets 5 credits
        is_admin: isFirstUser, // First user becomes admin
      },
    ])

    if (insertError) {
      console.error('Error creating user credits record:', insertError)

      // If the table doesn't exist, try to create it
      if (insertError.code === '42P01') {
        console.log('Table does not exist, trying to create it')
        const { error: rpcError } = await supabase.rpc('ensure_tables_exist')
        if (rpcError) {
          console.error('Error creating tables:', rpcError)
          return
        }

        // Try inserting again
        const { error: retryError } = await supabase
          .from('user_credits')
          .insert([
            {
              user_id: session.user.id,
              credits: 5,
              is_admin: isFirstUser,
            },
          ])

        if (retryError) {
          console.error(
            'Error creating user credits record after table creation:',
            retryError
          )
        }
      }
    }
  } catch (error) {
    console.error('Error in initializeUserCredits:', error)
  }
}

// Password reset handler
const handlePasswordReset = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  resetLoading.value = true

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(
      resetEmail.value,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    )

    if (error) throw error

    successMsg.value = 'Password reset link sent! Check your email.'
    resetEmail.value = ''
    // Switch back to login mode after sending reset link
    mode.value = 'login'
  } catch (error) {
    errorMsg.value = error.message || 'Failed to send reset link.'
  } finally {
    resetLoading.value = false
  }
}
</script>

<style scoped>
.font-orbitron {
  font-family: 'Orbitron', sans-serif;
}
</style>
