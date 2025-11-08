<script setup lang="ts">
import "@/_App.scss";
import { components } from "@/components/index";
import { ref } from "vue";

const isForm = ref(false);
const toggleForm = () => {
  isForm.value = !isForm.value;
};
</script>

<template>
  <div class="app-content">
    <h1>Projects</h1>
    <button @click="toggleForm">Add Project</button>
  </div>
  <div class="app-filter-sort">
    <components.ProjectFilter />
    <components.ProjectSort />
  </div>
  <components.Table />
  <components.AddProjects v-if="isForm" @close="toggleForm" />
</template>
  