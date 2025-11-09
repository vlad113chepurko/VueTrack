<script setup lang="ts">
import { useProjectStore } from "@/stores/useProjectStore";
import { useFormStore } from "@/stores/useFormStore";
import { useRoute } from "vue-router";
import { ProjectsService } from "@/services/projects.service";

// Project Details Logic
const route = useRoute();
const projectId = Number(route.params.id);
const projectStore = useProjectStore();

const formStore = useFormStore();

const project = projectStore.getProjectById(projectId);
</script>

<template>
  <div class="app-content">
    <article>
      <h1 style="margin-bottom: 5px">Project: {{ project?.ProjectName }}</h1>
      <p>Project Description: {{ project?.ProjectDescription }}</p>
    </article>
    <div
      style="
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: center;
        align-items: center;
      "
    >
      <button
        @click="ProjectsService.deleteProject(projectId, projectStore)"
        type="button"
        style="background-color: red"
      >
        Remove Project
      </button>
      <button
        style="background-color: orange"
        type="button"
        @click="formStore.openUpdateForm()"
      >
        Update Project
      </button>
      <button type="button" @click="formStore.openForm()">Add Task</button>
    </div>
  </div>
</template>
