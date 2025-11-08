<script setup lang="ts">
import { useProjectStore } from "@/stores/useProjectStore";
import { useRouter } from "vue-router";
const router = useRouter();

const projectStore = useProjectStore();

const goToProfile = (projectId: number) => {
  router.push(`/projects/${projectId}  `);
};
</script>

<template>
  <tbody>
    <tr
      @click="goToProfile(project.ID)"
      v-for="project in projectStore.filteredProjects"
      :key="project.ID"
    >
      <td>
        {{ project.ID }}
      </td>
      <td>
        {{ project.ProjectName }}
      </td>
      <td>
        {{ project.TaskCounter }}
      </td>
      <td>
        {{ project.Status }}
      </td>
      <td>
        {{ project.CreateAt }}
      </td>
    </tr>
  </tbody>
</template>
