<script setup lang="ts">
import "./_ProjectsTable.scss";
import { useProjectStore } from "@/stores/useProjectStore";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";
const router = useRouter();

const projectStore = useProjectStore();

const goToProfile = (projectId: number) => {
  router.push(`/projects/${projectId}`);
};
</script>

<template>
  <div class="table__container">
    <div class="table__header">
      <div class="table__row table__row--header">
        <div class="table__cell">ID</div>
        <div class="table__cell">Project Name</div>
        <div class="table__cell">Tasks Count</div>
        <div class="table__cell">Status</div>
        <div class="table__cell">Created At</div>
      </div>
    </div>

    <draggable
      v-model="projectStore.projects"
      tag="div"
      class="table__body"
      :animation="200"
    >
      <template #item="{ element: project }">
        <div
          v-if="
            (projectStore.selectedStatus === 'All' ||
              project.Status === projectStore.selectedStatus) &&
            (!projectStore.projectName ||
              project.ProjectName.includes(projectStore.projectName))
          "
          class="table__row"
          @click="goToProfile(project.ID)"
        >
          <div class="table__cell">{{ project.ID }}</div>
          <div class="table__cell">{{ project.ProjectName }}</div>
          <div class="table__cell">{{ project.TaskCounter }}</div>
          <div class="table__cell">{{ project.Status }}</div>
          <div class="table__cell">{{ project.CreateAt }}</div>
        </div>
      </template>
    </draggable>
  </div>
</template>
