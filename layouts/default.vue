<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar with cyberpunk styling -->
    <header
      class="navbar bg-neutral shadow-lg backdrop-blur-sm border-b border-primary/30"
    >
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52 border border-primary/30"
          >
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/about">About</NuxtLink></li>
            <li v-if="user"><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
          </ul>
        </div>
        <NuxtLink
          to="/"
          class="btn btn-ghost normal-case text-xl font-orbitron"
        >
          <span class="glitch-effect text-accent" data-text="BLUR VAULT"
            >BLUR VAULT</span
          >
        </NuxtLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><NuxtLink to="/" class="hover:text-accent">Home</NuxtLink></li>
          <li>
            <NuxtLink to="/about" class="hover:text-accent">About</NuxtLink>
          </li>
          <li v-if="user">
            <NuxtLink to="/dashboard" class="hover:text-accent"
              >Dashboard</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <template v-if="user">
          <div class="dropdown dropdown-end">
            <label
              tabindex="0"
              class="btn btn-ghost btn-circle avatar placeholder"
            >
              <div
                class="bg-neutral-focus text-neutral-content rounded-full w-10"
              >
                <span>{{
                  user.email ? user.email.charAt(0).toUpperCase() : 'U'
                }}</span>
              </div>
            </label>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52 border border-primary/30"
            >
              <li>
                <a class="justify-between">
                  Credits
                  <span class="badge badge-accent">{{ userCredits }}</span>
                </a>
              </li>
              <li><NuxtLink to="/profile">Profile</NuxtLink></li>
              <li><a @click="signOut">Logout</a></li>
            </ul>
          </div>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="btn btn-primary btn-sm">Login</NuxtLink>
        </template>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer with cyberpunk styling -->
    <footer
      class="footer footer-center p-4 bg-neutral text-base-content border-t border-primary/30"
    >
      <div>
        <p>
          © 2025 <span class="text-accent">BLUR VAULT</span> - Privacy in a
          Cyberpunk World
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const userCredits = ref(5) // Default 5 credits per user

// Fetch user credit information from Supabase if user is logged in
watchEffect(async () => {
  if (user.value) {
    try {
      const { data, error } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', user.value.id)
        .single()

      if (error) throw error
      if (data) userCredits.value = data.credits
    } catch (error) {
      console.error('Error fetching user credits:', error)
    }
  }
})

// Sign out function
const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/')
  } catch (error) {
    console.error('Error signing out:', error.message)
  }
}
</script>

<style scoped>
.font-orbitron {
  font-family: 'Orbitron', sans-serif;
}
</style>
