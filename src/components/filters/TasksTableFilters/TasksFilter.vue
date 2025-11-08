<script setup lang="ts">
import "@/components/filters/ProjectTableFilters/_ProjectFilter.scss";
import { tasksFilters } from "./components/index";
</script>
<template>
  <div style="width: 50%">
    <h2 style="margin-bottom: 10px">Filter</h2>
    <div class="filter">
      <tasksFilters.TasksAuthorFilter />
      <tasksFilters.TasksStatusFilter />
    </div>
  </div>
</template>
