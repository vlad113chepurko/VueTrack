<script setup lang="ts">
import "@/components/tasks/_ProjectDetails.scss";
import { useRoute } from "vue-router";
import { computed } from "vue";
import ProjectDetails from "@/components/tasks/ProjectDetails.vue";
const route = useRoute();
const projectId = computed(() => route.params.id as string);
</script>

<template>
  <div class="project-view">
    <ProjectDetails :projectId="projectId" />
  </div>
</template>
