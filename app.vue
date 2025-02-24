<template>
  <div
    class="min-h-screen bg-base-100 text-base-content"
    data-theme="cyberpunk"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Share Tech Mono', monospace;
  background-color: #0c090d;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
}

.glitch-effect {
  position: relative;
  display: inline-block;
}

.glitch-effect::before,
.glitch-effect::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-effect::before {
  left: 2px;
  text-shadow: -1px 0 #00fbff;
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
}

.glitch-effect::after {
  left: -2px;
  text-shadow: 1px 0 #ff4ecd;
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}

@keyframes glitch-anim-1 {
  0%,
  100% {
    clip-path: inset(50% 0 30% 0);
  }
  20% {
    clip-path: inset(33% 0 33% 0);
  }
  40% {
    clip-path: inset(10% 0 60% 0);
  }
  60% {
    clip-path: inset(70% 0 10% 0);
  }
  80% {
    clip-path: inset(20% 0 40% 0);
  }
}

@keyframes glitch-anim-2 {
  0%,
  100% {
    clip-path: inset(40% 0 40% 0);
  }
  20% {
    clip-path: inset(15% 0 45% 0);
  }
  40% {
    clip-path: inset(50% 0 30% 0);
  }
  60% {
    clip-path: inset(25% 0 55% 0);
  }
  80% {
    clip-path: inset(60% 0 20% 0);
  }
}
</style>
