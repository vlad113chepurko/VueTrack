<script setup lang="ts">
import { useTasksStore } from "@/stores/useTasksStore";
const tasksStore = useTasksStore();
</script>

<template>
  <div class="input__container">
    <label for="by">Sort by Deadline</label>
    <div class="input__container-sort">
      <input
        type="date"
        name="taskDeadline"
        id="taskDeadline"
        v-model="tasksStore.selectedDeadline"
      />
    </div>
  </div>
</template>
