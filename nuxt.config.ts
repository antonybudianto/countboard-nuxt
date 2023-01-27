// https://nuxt.com/docs/guide/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/tailwindcss"],
  telemetry: false,
  app: {
    head: {
      htmlAttrs: {
        class: "dark",
      },
      bodyAttrs: {
        class: "dark:bg-gray-900 dark:text-sky-200",
      },
    },
  },
});
