<script setup lang="ts">
import "./_ProjectDetails.scss";
import { ref } from "vue";
import Table from "./Table.vue";
import { useProjectStore } from "@/stores/useProjectStore";
import { useRoute } from "vue-router";
import TasksTableSort from "../sort/TasksTableSort/TasksTableSort.vue";
import TasksFilter from "@/components/filters/TasksTableFilters/TasksFilter.vue";
const route = useRoute();
const projectId = Number(route.params.id);
const projectStore = useProjectStore();
const project = projectStore.getProjectById(projectId);
import { components } from "@/components/index";
const isForm = ref(false);
const toggleForm = () => {
  isForm.value = !isForm.value;
};
</script>

<template>
  <div class="project-wrapper" v-if="project">
    <div class="app-content">
      <article>
        <h1>Project: {{ project.ProjectName }}</h1>
        <p>Project Description: {{ project.ProjectDescription }}</p>
      </article>
      <button @click="toggleForm">Add Task</button>
    </div>
    <div class="app-filter-sort">
      <TasksFilter />
      <TasksTableSort />
    </div>
    <Table :projectId="projectId" />
  </div>

  <div v-else>
    <p>Project not found.</p>
  </div>

  <components.AddTask v-if="isForm" @close="toggleForm" />
</template>
