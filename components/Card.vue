<template>
  <div
    class="flex flex-col justify-center bg-cyan-50 rounded shadow p-4 dark:bg-gray-800 dark:text-white"
  >
    <div class="mb-4">{{ name }}:</div>
    <div class="flex justify-between">
      <div class="flex items-center justify-center">
        <button
          :class="[
            'bg-red-500 transition-all text-white px-4 py-2 rounded',
            animMin ? 'animate-scale bg-red-400' : '',
          ]"
          @click="onDecrement"
          @animationend="
            (_) => {
              animMin = false;
            }
          "
        >
          -
        </button>
        <div class="flex justify-center items-center px-2">
          <span class="font-bold text-center text-2xl w-8">{{ count }}</span>
          <span v-if="defaultCount > 0" class="text-xs opacity-50">/</span>
          <span
            v-if="defaultCount > 0"
            class="font-bold text-center text-sm mx-2 w-3 opacity-50"
            >{{ defaultCount }}</span
          >
        </div>
        <button
          :class="[
            'bg-green-500 transition-all text-white px-4 py-2 rounded',
            animPlus ? 'animate-scale bg-green-400' : '',
          ]"
          @click="onIncrement"
          @animationend="
            (_) => {
              animPlus = false;
            }
          "
        >
          +
        </button>
      </div>
      <button
        class="bg-gray-500 ease-in hover:ease-out transition duration-150 hover:scale-110 hover:bg-gray-400 text-white px-4 py-2 rounded"
        @click="onDelete"
      >
        X
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  key: String,
  name: String,
  count: Number,
  defaultCount: Number,
});
const emit = defineEmits(["onDelete", "onIncrement", "onDecrement"]);

const animPlus = ref(false);
const animMin = ref(false);

const onIncrement = () => {
  animPlus.value = true;
  emit("onIncrement");
};
const onDecrement = () => {
  animMin.value = true;
  emit("onDecrement");
};
const onDelete = () => {
  emit("onDelete");
};
</script>

<style scoped>
/* styles here */
</style>
