<template>
  <div class="container mx-auto py-12 px-4">
    <div
      class="card bg-neutral shadow-xl border border-primary/30 max-w-2xl mx-auto"
    >
      <div class="card-body">
        <h1 class="text-3xl font-bold mb-8 font-orbitron text-primary">
          User Profile
        </h1>

        <div v-if="loading" class="flex justify-center my-8">
          <div class="loading loading-spinner loading-lg text-accent"></div>
        </div>

        <div v-else>
          <!-- User Avatar -->
          <div class="flex justify-center mb-8">
            <div class="avatar placeholder">
              <div
                class="bg-neutral-focus text-neutral-content rounded-full w-24 h-24 ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                <span class="text-3xl">{{ userInitial }}</span>
              </div>
            </div>
          </div>

          <!-- User Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-base-content">Email</span>
              </label>
              <input
                type="email"
                :value="user?.email"
                class="input input-bordered bg-neutral-focus border-accent/50"
                disabled
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text text-base-content">Account Status</span>
              </label>
              <input
                type="text"
                :value="isAdmin ? 'Administrator' : 'User'"
                class="input input-bordered bg-neutral-focus border-accent/50"
                disabled
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text text-base-content"
                  >Available Credits</span
                >
              </label>
              <input
                type="text"
                :value="userCredits"
                class="input input-bordered bg-neutral-focus border-accent/50"
                disabled
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text text-base-content"
                  >Account Created</span
                >
              </label>
              <input
                type="text"
                :value="formatDate(user?.created_at)"
                class="input input-bordered bg-neutral-focus border-accent/50"
                disabled
              />
            </div>
          </div>

          <!-- Change Password Section -->
          <div class="divider my-8">Password Management</div>

          <form @submit.prevent="updatePassword" class="max-w-md mx-auto">
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text text-base-content"
                  >Current Password</span
                >
              </label>
              <input
                type="password"
                v-model="currentPassword"
                class="input input-bordered bg-neutral-focus border-accent/50 focus:border-accent"
                required
              />
            </div>

            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text text-base-content">New Password</span>
              </label>
              <input
                type="password"
                v-model="newPassword"
                class="input input-bordered bg-neutral-focus border-accent/50 focus:border-accent"
                required
              />
            </div>

            <div class="form-control mb-6">
              <label class="label">
                <span class="label-text text-base-content"
                  >Confirm New Password</span
                >
              </label>
              <input
                type="password"
                v-model="confirmPassword"
                class="input input-bordered bg-neutral-focus border-accent/50 focus:border-accent"
                required
              />
            </div>

            <div class="form-control">
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="passwordLoading"
              >
                <span
                  v-if="passwordLoading"
                  class="loading loading-spinner"
                ></span>
                <span v-else>Update Password</span>
              </button>
            </div>
          </form>

          <!-- Messages -->
          <div v-if="errorMsg" class="alert alert-error mt-6">
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

          <div v-if="successMsg" class="alert alert-success mt-6">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'

// Auth and database
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// Redirect if user is not logged in
watchEffect(() => {
  if (user.value === null) {
    router.push('/login')
  }
})

// State
const loading = ref(true)
const userCredits = ref(0)
const isAdmin = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordLoading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

// Computed properties
const userInitial = computed(() => {
  if (!user.value || !user.value.email) return '?'
  return user.value.email.charAt(0).toUpperCase()
})

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Fetch user data
onMounted(async () => {
  loading.value = true
  try {
    await fetchUserData()
  } catch (error) {
    console.error('Error fetching user data:', error)
    errorMsg.value = 'Failed to load user data. Please try again.'
  } finally {
    loading.value = false
  }
})

// Fetch user credits and admin status
const fetchUserData = async () => {
  if (!user.value) return

  try {
    const { data, error } = await supabase
      .from('user_credits')
      .select('credits, is_admin')
      .eq('user_id', user.value.id)
      .single()

    if (error) throw error

    if (data) {
      userCredits.value = data.credits
      isAdmin.value = data.is_admin
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

// Update password
const updatePassword = async () => {
  // Clear messages
  errorMsg.value = ''
  successMsg.value = ''

  // Validate passwords
  if (newPassword.value !== confirmPassword.value) {
    errorMsg.value = 'New passwords do not match.'
    return
  }

  if (newPassword.value.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters long.'
    return
  }

  passwordLoading.value = true

  try {
    // First verify the current password by signing in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.value.email,
      password: currentPassword.value,
    })

    if (signInError) {
      errorMsg.value = 'Current password is incorrect.'
      return
    }

    // Update the password
    const { error } = await supabase.auth.updateUser({
      password: newPassword.value,
    })

    if (error) throw error

    // Success
    successMsg.value = 'Password updated successfully.'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (error) {
    console.error('Error updating password:', error)
    errorMsg.value =
      error.message || 'Failed to update password. Please try again.'
  } finally {
    passwordLoading.value = false
  }
}
</script>

<style scoped>
.font-orbitron {
  font-family: 'Orbitron', sans-serif;
}
</style>
