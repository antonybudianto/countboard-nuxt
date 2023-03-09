<template>
  <div
    class="flex flex-col justify-center mt-2 bg-cyan-50 rounded shadow p-4 dark:bg-gray-800 dark:text-white"
  >
    <div class="mb-4 select-none">{{ name }}:</div>
    <div class="flex justify-between">
      <div class="flex items-center justify-center">
        <button
          :class="[
            'bg-red-500 transition-all text-white px-4 py-2 rounded select-none',
            animMin ? 'animate-scale' : '',
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
        <div class="flex justify-center items-center px-2 select-none">
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
            'bg-green-500 transition-all text-white px-4 py-2 rounded select-none',
            animPlus ? 'animate-scale' : '',
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
      <div class="flex justify-center items-center">
        <button
          class="bg-gray-500 select-none ease-in hover:ease-out transition duration-150 hover:scale-110 hover:bg-gray-400 text-white px-4 py-2 rounded"
          @click="onDelete"
        >
          X
        </button>
        <button
          class="drag-handle bg-gray-500 ml-1 md:ml-2 select-none ease-in hover:ease-out transition duration-150 hover:bg-gray-400 text-white px-4 py-2 rounded"
        >
          <img style="width: 10px; height: 24px" src="/icons/menu.png" />
        </button>
      </div>
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
