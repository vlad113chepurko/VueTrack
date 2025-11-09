<script setup lang="ts">
import "./_ProjectDetails.scss";
import { useFormStore } from "@/stores/useFormStore";

// Filters and Sorters
import TasksTableSort from "../sort/tasks-table-sort/TasksTableSort.vue";
import TasksFilter from "../filters/tasks-table-filter/TasksFilter.vue";

// Components
import { components } from "@/components/index";
import TasksTable from "./TasksTable.vue";
import TasksDetailsHeader from "./TasksDetailsHeader.vue";
</script>

<template>
  <div class="project-wrapper">
    <TasksDetailsHeader />
    <div class="app-filter-sort">
      <TasksFilter />
      <TasksTableSort />
    </div>
    <TasksTable />
  </div>
  <components.AddTask v-if="useFormStore().isFormOpen" />
  <components.UpdateProject v-if="useFormStore().isUpdateFormOpen" />
</template>
