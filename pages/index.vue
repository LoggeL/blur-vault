<template>
  <div>
    <!-- Hero Section with Cyberpunk Styling -->
    <section class="hero min-h-[70vh] relative overflow-hidden">
      <!-- Cyberpunk Grid Background -->
      <div class="absolute inset-0 bg-grid z-0"></div>

      <!-- Content Overlay -->
      <div class="hero-content text-center z-10 relative">
        <div class="max-w-md md:max-w-2xl">
          <h1 class="text-5xl font-bold mb-8 font-orbitron">
            <span
              class="glitch-effect block text-primary"
              data-text="BLUR VAULT"
              >BLUR VAULT</span
            >
          </h1>
          <p class="text-xl mb-4 text-accent font-mono">
            Protect your identity in the digital age
          </p>
          <p class="mb-8 text-base-content/80">
            Powerful face-blurring technology to preserve your privacy in a
            world of constant surveillance. Our AI-powered blur keeps your
            identity secure while maintaining image quality.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/dashboard" v-if="user" class="btn btn-primary">
              Go to Dashboard
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clip-rule="evenodd"
                />
              </svg>
            </NuxtLink>
            <NuxtLink to="/login" v-else class="btn btn-primary">
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clip-rule="evenodd"
                />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="btn btn-outline border-accent text-accent hover:bg-accent hover:text-neutral"
            >
              Learn More
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 px-4">
      <div class="container mx-auto">
        <h2
          class="text-3xl font-bold mb-12 text-center font-orbitron text-primary"
        >
          Key Features
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div
            class="card bg-neutral shadow-xl border border-primary/30 hover:border-primary transition-all duration-300"
          >
            <div class="card-body">
              <div class="text-accent mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h3 class="card-title text-base-content font-orbitron">
                Advanced Face Detection
              </h3>
              <p class="text-base-content/70">
                Cutting-edge AI algorithms detect faces with precision, even in
                complex backgrounds or group photos.
              </p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div
            class="card bg-neutral shadow-xl border border-primary/30 hover:border-primary transition-all duration-300"
          >
            <div class="card-body">
              <div class="text-accent mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </div>
              <h3 class="card-title text-base-content font-orbitron">
                Intelligent Blurring
              </h3>
              <p class="text-base-content/70">
                Seamlessly blur faces while preserving image quality and
                surrounding details. Privacy without compromise.
              </p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div
            class="card bg-neutral shadow-xl border border-primary/30 hover:border-primary transition-all duration-300"
          >
            <div class="card-body">
              <div class="text-accent mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-10 h-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </div>
              <h3 class="card-title text-base-content font-orbitron">
                Instant Processing
              </h3>
              <p class="text-base-content/70">
                Get your protected images in seconds with our high-speed
                processing system built for the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
</script>

<style scoped>
.font-orbitron {
  font-family: 'Orbitron', sans-serif;
}

.bg-grid {
  background-image: linear-gradient(
      to right,
      rgba(0, 251, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(0, 251, 255, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center;
  mask-image: radial-gradient(circle at center, black 60%, transparent 100%);
}

.hero:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50%;
  background: linear-gradient(
    to top,
    rgba(12, 9, 13, 1) 0%,
    rgba(12, 9, 13, 0) 100%
  );
  z-index: 1;
}
</style>
