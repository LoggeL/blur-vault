<template>
  <div class="container mx-auto py-12 px-4">
    <!-- About Hero Section -->
    <section class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 font-orbitron">
        <span class="text-primary">ABOUT</span>
        <span class="glitch-effect text-accent" data-text="BLUR VAULT"
          >BLUR VAULT</span
        >
      </h1>
      <p class="text-xl md:text-2xl text-base-content/80 max-w-3xl mx-auto">
        <span class="text-primary font-mono">"</span>
        <span class="font-mono"
          >In a world where privacy is an illusion, we make invisibility a
          reality.</span
        >
        <span class="text-primary font-mono">"</span>
      </p>
    </section>

    <!-- Mission Statement -->
    <section class="mb-20 relative">
      <div
        class="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/5 to-secondary/20 blur-xl opacity-30 -z-10 rounded-xl"
      ></div>
      <div
        class="card border border-accent/30 bg-neutral/80 backdrop-blur-sm shadow-xl"
      >
        <div class="card-body">
          <h2
            class="card-title text-2xl md:text-3xl font-orbitron text-accent mb-4"
          >
            Our Mission
          </h2>
          <p class="mb-4">
            BLUR VAULT was born from a simple yet powerful idea: in the age of
            ubiquitous surveillance and facial recognition, everyone deserves
            control over their digital identity.
          </p>
          <p class="mb-4">
            Our mission is to give individuals the tools to protect their
            privacy in an increasingly connected world, where every photograph
            can become a data point in vast tracking systems.
          </p>
          <p>
            We believe privacy isn't just a luxury—it's a fundamental right that
            should be accessible to everyone, regardless of technical knowledge
            or resources.
          </p>
        </div>
      </div>
    </section>

    <!-- The Team -->
    <section class="mb-20">
      <h2 class="text-3xl font-bold mb-8 font-orbitron text-primary">
        The Resistance
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Team Member 1 -->
        <div
          class="card bg-neutral shadow-xl border border-primary/30 hover:border-primary transition-all duration-300"
        >
          <figure class="px-6 pt-6">
            <div class="avatar placeholder">
              <div
                class="bg-neutral-focus text-primary-content rounded-full w-32 h-32 ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                <span class="text-3xl">DR</span>
              </div>
            </div>
          </figure>
          <div class="card-body">
            <h3 class="card-title justify-center font-orbitron">Dr. Echo</h3>
            <p class="text-center text-accent font-mono">
              Founder & Lead Developer
            </p>
            <p class="text-center text-base-content/70">
              Former data scientist who witnessed firsthand how facial
              recognition technology was being misused.
            </p>
          </div>
        </div>

        <!-- Team Member 2 -->
        <div
          class="card bg-neutral shadow-xl border border-primary/30 hover:border-primary transition-all duration-300"
        >
          <figure class="px-6 pt-6">
            <div class="avatar placeholder">
              <div
                class="bg-neutral-focus text-primary-content rounded-full w-32 h-32 ring ring-secondary ring-offset-base-100 ring-offset-2"
              >
                <span class="text-3xl">NX</span>
              </div>
            </div>
          </figure>
          <div class="card-body">
            <h3 class="card-title justify-center font-orbitron">Neon Xara</h3>
            <p class="text-center text-accent font-mono">
              AI & Computer Vision Expert
            </p>
            <p class="text-center text-base-content/70">
              Pioneered breakthrough algorithms that can detect and obscure
              faces with unprecedented accuracy.
            </p>
          </div>
        </div>

        <!-- Team Member 3 -->
        <div
          class="card bg-neutral shadow-xl border border-primary/30 hover:border-primary transition-all duration-300"
        >
          <figure class="px-6 pt-6">
            <div class="avatar placeholder">
              <div
                class="bg-neutral-focus text-primary-content rounded-full w-32 h-32 ring ring-accent ring-offset-base-100 ring-offset-2"
              >
                <span class="text-3xl">VX</span>
              </div>
            </div>
          </figure>
          <div class="card-body">
            <h3 class="card-title justify-center font-orbitron">Vortex</h3>
            <p class="text-center text-accent font-mono">
              Security & Privacy Advocate
            </p>
            <p class="text-center text-base-content/70">
              Digital rights activist ensuring our technology is used ethically
              and remains accessible to all.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 font-orbitron text-primary">
        How It Works
      </h2>

      <div class="relative">
        <div
          class="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/5 to-accent/20 blur-xl opacity-20 -z-10 rounded-xl"
        ></div>

        <ul class="steps steps-vertical lg:steps-horizontal w-full">
          <li class="step step-primary">
            <div class="my-6 px-4">
              <h3 class="text-xl font-orbitron mb-2">Upload</h3>
              <p class="text-base-content/70">
                Upload any image containing faces you want to protect.
              </p>
            </div>
          </li>
          <li class="step step-primary">
            <div class="my-6 px-4">
              <h3 class="text-xl font-orbitron mb-2">Detection</h3>
              <p class="text-base-content/70">
                Our AI instantly identifies and maps all faces in the image.
              </p>
            </div>
          </li>
          <li class="step step-primary">
            <div class="my-6 px-4">
              <h3 class="text-xl font-orbitron mb-2">Processing</h3>
              <p class="text-base-content/70">
                Advanced algorithms apply customized blurring to each detected
                face.
              </p>
            </div>
          </li>
          <li class="step step-primary">
            <div class="my-6 px-4">
              <h3 class="text-xl font-orbitron mb-2">Download</h3>
              <p class="text-base-content/70">
                Download your privacy-protected image immediately.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="text-center">
      <div class="card bg-neutral shadow-xl border border-primary">
        <div class="card-body items-center">
          <h2 class="card-title text-2xl md:text-3xl font-orbitron mb-4">
            Ready to Protect Your Identity?
          </h2>
          <p class="mb-6 max-w-2xl">
            Join the digital resistance today and take control of your privacy
            with BLUR VAULT's cutting-edge face protection technology.
          </p>
          <div class="card-actions">
            <NuxtLink to="/login" class="btn btn-primary btn-lg">
              Get Started Now
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
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No special logic needed for this page
</script>

<style scoped>
.font-orbitron {
  font-family: 'Orbitron', sans-serif;
}
</style>
