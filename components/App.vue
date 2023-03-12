<template>
  <div class="p-4 md:p-0 min-h-screen">
    <div class="mb-4">
      <Form @onAddItem="handleAddItem" />
    </div>
    <div class="grid grid-cols-1 gap-4 mb-5">
      <Loading v-if="state.loading" />
      <div v-if="state.items.length === 0">
        <div
          class="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            💡 Get started
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Start by adding your daily chores/activities and the target count!
            <br />
            You can also set to zero for undetermined target.
          </p>
        </div>
      </div>
      <draggable
        v-else
        v-model="state.items"
        handle=".drag-handle"
        class="list-group"
        tag="transition-group"
        :component-data="{ tag: 'ul', name: 'flip-list', type: 'transition' }"
        @start="drag = true"
        @end="handleEnd"
        item-key="id"
      >
        <template #item="{ element, index }">
          <Card
            :name="element.name"
            :count="element.count"
            :defaultCount="element.defaultCount"
            @onDecrement="() => handleDecrement(index)"
            @onIncrement="() => handleIncrement(index)"
            @onDelete="() => handleDelete(index)"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
</style>

<script setup lang="ts">
import Draggable from "vuedraggable";
import { reactive, onMounted } from "vue";

const drag = ref(false);

interface Item {
  name: string;
  count: number;
  date: string;
  defaultCount: number;
}

interface State {
  items: Item[];
  loading: boolean;
  today: string;
}

const state = reactive<State>({
  items: [],
  loading: true,
  today: new Date().toDateString(),
});

const handleEnd = () => {
  drag.value = false;

  const updatedItems = [...state.items];
  localStorage.setItem("items", JSON.stringify(updatedItems));
};

const handleAddItem = ({
  newItem,
  newItemDefaultCount,
}: {
  newItem: string;
  newItemDefaultCount: number;
}) => {
  const updatedItems: Item[] = [
    ...state.items,
    {
      name: newItem,
      count: newItemDefaultCount,
      date: state.today,
      defaultCount: newItemDefaultCount,
    },
  ];
  state.items = updatedItems;
  localStorage.setItem("items", JSON.stringify(updatedItems));
};

const handleIncrement = (index: number) => {
  const updatedItems = [...state.items];
  updatedItems[index].count += 1;
  updatedItems[index].date = state.today;
  state.items = updatedItems;
  localStorage.setItem("items", JSON.stringify(updatedItems));
};

const handleDecrement = (index: number) => {
  const updatedItems = [...state.items];
  updatedItems[index].count -= 1;
  updatedItems[index].date = state.today;
  state.items = updatedItems;
  localStorage.setItem("items", JSON.stringify(updatedItems));
};

const handleDelete = (index: number) => {
  if (!confirm("Are you sure?")) {
    return;
  }
  const updatedItems = [...state.items];
  updatedItems.splice(index, 1);
  state.items = updatedItems;
  localStorage.setItem("items", JSON.stringify(updatedItems));
};

onMounted(() => {
  const storedItems = JSON.parse(localStorage.getItem("items") || "[]");
  const filteredItems = storedItems.filter(
    (item: Item) =>
      new Date(item.date).getTime() >=
      new Date().getTime() - 7 * 24 * 60 * 60 * 1000
  );
  filteredItems.forEach((item: Item) => {
    if (item.date !== state.today) {
      item.count = item.defaultCount;
    }
  });
  state.items = filteredItems;
  state.loading = false;
  localStorage.setItem("items", JSON.stringify(filteredItems));
});
</script>
