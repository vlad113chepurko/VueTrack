<script setup lang="ts">
import { ref, watch } from "vue";
import { useProjectStore } from "@/stores/useProjectStore";

const projectStore = useProjectStore();
const sortById = ref<string>("idAsc");
const sortByName = ref<string>("nameAsc");
const sortByCount = ref<string>("countAsc");

watch(sortById, (newVal) => {
  console.log(`Sort By ID changed to: ${newVal}`);
  projectStore.sortingById(newVal);
});

watch(sortByName, (newVal) => {
  console.log(`Sort By Name changed to: ${newVal}`);
  projectStore.sortingByName(newVal);
});

watch(sortByCount, (newVal) => {
  console.log(`Sort By Count changed to: ${newVal}`);
  projectStore.sortingByCount(newVal);
});
</script>

<template>
  <div class="sort__container">
    <div class="input__container">
      <label for="by">Sort by ID</label>
      <select v-model="sortById" name="sortById" id="sortById">
        <option value="idAsc">ID Ascending</option>
        <option value="idDesc">ID Descending</option>
      </select>
    </div>

    <div class="input__container">
      <label for="sortByName">Sort by Name</label>
      <select v-model="sortByName" name="sortByName" id="sortByName">
        <option value="nameAsc">Name A-Z</option>
        <option value="nameDesc">Name Z-A</option>
      </select>
    </div>

    <div class="input__container">
      <label for="sortByCount">Sort by Count</label>
      <select v-model="sortByCount" name="sortByCount" id="sortByCount">
        <option value="countAsc">Count Ascending</option>
        <option value="countDesc">Count Descending</option>
      </select>
    </div>
  </div>
</template>
