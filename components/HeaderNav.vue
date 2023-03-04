<template>
  <nav>
    <section class="MOBILE-MENU flex lg:hidden">
      <div
        class="HAMBURGER-ICON space-y-2"
        @click="() => setIsNavOpen(!isNavOpen)"
      >
        <span class="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span class="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        <span class="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
      </div>

      <div
        :class="[
          'menu',
          'bg-gray-900',
          isNavOpen ? 'showMenuNav' : 'hideMenuNav',
          animClose ? 'animClose' : '',
        ]"
      >
        <div
          class="CROSS-ICON absolute top-0 right-0 px-5 py-12"
          @click="handleClose"
        >
          <svg
            class="h-8 w-8 text-gray-600"
            view-box="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <ul
          class="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[10px]"
        >
          <li class="my-8 uppercase font-bold text-lg">
            <NuxtLink to="/" @click="(_) => setIsNavOpen(false)">Home</NuxtLink>
          </li>
          <li class="my-8 uppercase font-bold text-lg">
            <NuxtLink to="/config">Config</NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <ul class="DESKTOP-MENU hidden space-x-8 lg:flex">
      <li>
        <NuxtLink class="hover:underline" to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink class="hover:underline" to="/config">Config</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
a.router-link-exact-active {
  color: #00c58e;
  border-bottom: 1px solid #00c58e;
}
.menu {
  display: block;
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.hideMenuNav {
  opacity: 0;
  display: none;
  transform: translateX(100%);
}

.animClose {
  animation: 0.2s ease-out 0s 1 slideClose;
  opacity: 1;
  display: flex;
}

.showMenuNav {
  display: flex;
  animation: 0.2s ease-out 0s 1 slide;
}

@media (prefers-reduced-motion) {
  .animClose {
    animation: none;
  }
}

@keyframes slide {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideClose {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
<script setup lang="ts">
const isNavOpen = ref(false);
const animClose = ref(false);
const setIsNavOpen = (val: boolean) => {
  isNavOpen.value = val;
};

function handleClose() {
  animClose.value = true;
  setTimeout(() => {
    animClose.value = false;
  }, 500);
  setIsNavOpen(false);
}
</script>
