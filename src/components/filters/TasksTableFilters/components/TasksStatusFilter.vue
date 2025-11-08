<script setup lang="ts">
import { useTasksStore } from "@/stores/useTasksStore";
const tasksStore = useTasksStore();
</script>

<template>
  <div class="input__container">
    <label for="filterStatus">Status</label>
    <select v-model="tasksStore.selectedStatus" name="status" id="filterStatus">
      <option value="All">All</option>
      <option value="Todo">To-do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  </div>
</template>
