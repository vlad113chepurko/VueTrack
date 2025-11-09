<script setup lang="ts">
import "./_AddProjects.scss";
import { ref } from "vue";
import type { Project } from "@/types/project.type";
import { useProjectStore } from "@/stores/useProjectStore";
import { ProjectsService } from "@/services/projects.service";
import { useFormStore } from "@/stores/useFormStore";

const projectStore = useProjectStore();
const projects = projectStore.projects;
const formStore = useFormStore();

const newProject = ref<Project>({
  ID: projects.length > 0 ? Math.max(...projects.map((p) => p.ID)) + 1 : 1,
  ProjectName: "",
  ProjectDescription: "",
  TaskCounter: 0,
  Status: "",
  CreateAt: new Date().toLocaleDateString(),
  Tasks: [],
});
</script>

<template>
  <form
    class="form"
    @submit.prevent="ProjectsService.addProject(newProject, projectStore)"
  >
    <h2>Add New Project</h2>
    <button @click="formStore.closeForm()" type="button" class="form__close">
      <span>X</span>
    </button>
    <input
      type="text"
      v-model="newProject.ProjectName"
      placeholder="Enter project name"
      required
    />
    <select required name="status" id="status" v-model="newProject.Status">
      <option value="Active">Active</option>
      <option value="Completed">Completed</option>
    </select>
    <textarea
      placeholder="Enter project description"
      name="description"
      id="description"
      v-model="newProject.ProjectDescription"
    ></textarea>
    <input type="text" v-model="newProject.TaskCounter" hidden />
    <input type="text" v-model="newProject.Status" hidden />
    <button class="form__add" type="submit">Add Project</button>
  </form>
</template>
