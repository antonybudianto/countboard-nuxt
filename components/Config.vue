<template>
  <div class="p-4 md:px-0 min-h-screen">
    <div class="flex flex-row justify-between">
      <h1 class="text-xl font-bold">Config</h1>
      <NuxtLink class="hover:underline md:hidden" to="/">
        {{ "<" }} Home
      </NuxtLink>
    </div>
    <div class="mt-5 dark:text-cyan-50">
      <div class="mb-1">Copy your plain JSON data</div>
      <button
        type="button"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        @click="handleCopy"
      >
        Copy JSON Data
      </button>

      <div class="mt-3 mb-1">Load data from JSON</div>
      <input
        type="text"
        :value="data"
        class="px-4 py-2 mr-1 rounded dark:bg-gray-700 w-3/5"
        @input="handleChangeData"
      />
      <button
        type="button"
        class="text-white bg-gray-800 w-1/5 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-gray-50"
        :disabled="data === ''"
        @click="handleLoad"
      >
        Load
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import copy from "copy-to-clipboard";
const data = ref("");

function handleCopy() {
  copy(window.localStorage.getItem("items") || "[]");
}

function handleChangeData(e: Event) {
  data.value = (e.target as HTMLInputElement).value;
}

function handleLoad() {
  try {
    JSON.parse(data.value); // try parse if any error
    localStorage.setItem("items", data.value);
    alert("Success!");
  } catch (e) {
    alert("Error load!");
  }
}
</script>
