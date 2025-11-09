<script setup lang="ts">
import "@/_App.scss";
import { components } from "@/components/index";
import { useFormStore } from "@/stores/useFormStore";

const formStore = useFormStore();

console.log(formStore.isUpdateFormOpen);
</script>

<template>
  <div class="app-content">
    <h1>Projects</h1>
    <button @click="formStore.openForm()">Add Project</button>
  </div>
  <div class="app-filter-sort">
    <components.ProjectFilter />
    <components.ProjectSort />
  </div>
  <components.ProjectsTable />
  <components.AddProjects v-if="formStore.isFormOpen" />
</template>
