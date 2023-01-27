<template>
  <form @submit.prevent="handleAddItem" novalidate>
    <div class="flex justify-center">
      <input
        class="border border-2 text-sm md:text-base p-2 w-3/5 outline-2 outline-offset-2 dark:bg-gray-700 dark:border-gray-600"
        type="text"
        placeholder="Chore/activity name"
        v-model="newItem"
      />
      <input
        class="border border-2 text-sm md:text-base p-2 w-1/5 outline-2 outline-offset-2 dark:bg-gray-700 dark:border-gray-600"
        type="number"
        placeholder="Target"
        v-model.number="newItemDefaultCount"
      />
      <button
        type="submit"
        :disabled="newItem === ''"
        class="bg-blue-500 rounded text-white p-2 disabled:opacity-50 w-1/5"
      >
        Add
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["onAddItem"]);

const newItem = ref("");
const newItemDefaultCount = ref(0);

const handleAddItem = (e) => {
  e.preventDefault();
  emit("onAddItem", {
    newItem: newItem.value,
    newItemDefaultCount: newItemDefaultCount.value,
  });
  newItem.value = "";
  newItemDefaultCount.value = 0;
};
</script>

<style scoped>
/* Add your component's style here */
</style>
