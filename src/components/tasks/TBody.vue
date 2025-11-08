<script setup lang="ts">
import { onMounted } from "vue";
import { useTasksStore } from "@/stores/useTasksStore";
import { useRoute } from "vue-router";

const route = useRoute();
const tasksStore = useTasksStore();

onMounted(() => {
  const id = Number(route.params.id);
  if (!isNaN(id)) tasksStore.currentProjectId = id;
});
</script>

<template>
  <tbody>
    <tr v-for="task in tasksStore.filteredTasks" :key="task.ID">
      <td>{{ task.ID }}</td>
      <td>{{ task.TaskName }}</td>
      <td>{{ task.TaskAuthor }}</td>
      <td>{{ task.TaskStatus }}</td>
      <td>{{ task.TaskDeadline }}</td>
    </tr>
  </tbody>
</template>
