<script setup lang="ts">
import { useTasksStore } from "@/stores/useTasksStore";
const tasksStore = useTasksStore();
</script>

<template>
  <div class="input__container">
    <label for="by">Author</label>
    <select v-model="tasksStore.selectedAuthor" name="taskAuthor" id="taskAuthor">
      <option value="All">All</option>
      <option value="Alice">Alice</option>
      <option value="Bob">Bob</option>
      <option value="Charlie">Charlie</option>
    </select>
  </div>
</template>
