<script setup lang="ts">
import "@/components/sort/ProjectTableSort/_ProjectSort.scss";
import TasksStatusFilter from "@/components/filters/TasksTableFilters/components/TasksStatusFilter.vue";
import TasksDateSort from "./TasksDateSort.vue";
</script>

<template>
  <div style="width: 50%">
    <h2 style="margin-bottom: 10px">Sort</h2>
    <div class="sort">
      <TasksStatusFilter />
      <TasksDateSort />
    </div>
  </div>
</template>
