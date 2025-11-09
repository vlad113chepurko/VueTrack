<script setup lang="ts">
import "./_AddProjects.scss";
import type { Project } from "@/types/project.type";
import { ProjectsService } from "@/services/projects.service";
import { ref } from "vue";
import { useProjectStore } from "@/stores/useProjectStore";
import { useFormStore } from "@/stores/useFormStore";
import { useRoute } from "vue-router";

const route = useRoute();
const projectStore = useProjectStore();
const projectId = Number(route.params.id);

const formStore = useFormStore();

const taskCounter = projectStore.projects.find(
  (project) => project.ID === projectId
)?.TaskCounter;

const updatedProject = ref<Project>({
  ID: projectId,
  ProjectName: "",
  ProjectDescription: "",
  TaskCounter: taskCounter as number,
  Status: "",
  CreateAt: projectStore.projects.find((project) => project.ID === projectId)
    ?.CreateAt as string,
  Tasks: [],
});
</script>

<template>
  <form
    class="form"
    @submit.prevent="
      ProjectsService.updateProject(updatedProject, projectStore)
    "
  >
    <h2>Update Project</h2>
    <button
      @click="formStore.closeUpdateForm()"
      type="button"
      class="form__close"
    >
      <span>X</span>
    </button>
    <input
      type="text"
      v-model="updatedProject.ProjectName"
      placeholder="Update project name"
      required
    />
    <select required name="status" id="status" v-model="updatedProject.Status">
      <option value="Active">Active</option>
      <option value="Completed">Completed</option>
    </select>
    <textarea
      placeholder="Enter project description"
      name="description"
      id="description"
      v-model="updatedProject.ProjectDescription"
    ></textarea>
    <input type="text" v-model="updatedProject.TaskCounter" hidden />
    <input type="text" v-model="updatedProject.Status" hidden />
    <button class="form__add" type="submit">Update Project</button>
  </form>
</template>
