<script setup lang="ts">
import { useProjectStore } from "@/stores/useProjectStore";

const projectStore = useProjectStore();
</script>

<template>
  <div class="input__container">
    <label for="filterStatus">Status</label>
    <select
      v-model="projectStore.selectedStatus"
      id="filterStatus"
      name="status"
    >
      <option value="All">All</option>
      <option value="Active">Active</option>
      <option value="Completed">Completed</option>
    </select>
  </div>
</template>
