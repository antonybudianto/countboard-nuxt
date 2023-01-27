<template>
  <div class="p-4 min-h-screen">
    <div class="mb-4">
      <Form @onAddItem="handleAddItem" />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5"
    >
      <Loading v-if="loading" />
      <div v-if="items.length === 0">
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
      <Card
        v-else
        v-for="(item, index) in items"
        :key="index"
        :name="item.name"
        :count="item.count"
        :defaultCount="item.defaultCount"
        @onDecrement="() => handleDecrement(index)"
        @onIncrement="() => handleIncrement(index)"
        @onDelete="() => handleDelete(index)"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";

const App = {
  setup() {
    const state = reactive({
      items: [],
      loading: true,
      today: new Date().toDateString(),
    });

    onMounted(() => {
      const storedItems = JSON.parse(localStorage.getItem("items") || "[]");
      const filteredItems = storedItems.filter(
        (item) =>
          new Date(item.date).getTime() >=
          new Date().getTime() - 7 * 24 * 60 * 60 * 1000
      );
      filteredItems.forEach((item) => {
        if (item.date !== state.today) {
          item.count = item.defaultCount;
        }
      });
      state.items = filteredItems;
      state.loading = false;
      localStorage.setItem("items", JSON.stringify(filteredItems));
    });

    const handleAddItem = ({ newItem, newItemDefaultCount }) => {
      const updatedItems = [
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

    const handleIncrement = (index) => {
      const updatedItems = [...state.items];
      updatedItems[index].count += 1;
      updatedItems[index].date = state.today;
      state.items = updatedItems;
      localStorage.setItem("items", JSON.stringify(updatedItems));
    };

    const handleDecrement = (index) => {
      const updatedItems = [...state.items];
      updatedItems[index].count -= 1;
      updatedItems[index].date = state.today;
      state.items = updatedItems;
      localStorage.setItem("items", JSON.stringify(updatedItems));
    };

    const handleDelete = (index) => {
      if (!confirm("Are you sure?")) {
        return;
      }
      const updatedItems = [...state.items];
      updatedItems.splice(index, 1);
      state.items = updatedItems;
      localStorage.setItem("items", JSON.stringify(updatedItems));
    };

    return {
      ...toRefs(state),
      handleAddItem,
      handleIncrement,
      handleDecrement,
      handleDelete,
    };
  },
};

export default App;
</script>
