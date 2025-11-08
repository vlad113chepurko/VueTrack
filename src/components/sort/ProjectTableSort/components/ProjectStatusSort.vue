<script setup lang="ts">
import { ref, watch } from "vue";
import { useProjectStore } from "@/stores/useProjectStore";
const projectStore = useProjectStore();

const sortByStatus = ref<string>("All");

watch(sortByStatus, (newVal) => {
  console.log(`Sort By Status changed to: ${newVal}`);
  projectStore.sortingByStatus(newVal);
});
</script>

<template>
  <div class="input__container">
    <label for="sortStatus">Sort by Status</label>
    <select
      name="sortStatus"
      id="sortStatus"
      v-model="projectStore.selectedStatus"
    >
      <option value="All">All</option>
      <option value="Active">Active</option>
      <option value="Completed">Completed</option>
    </select>
  </div>
</template>
