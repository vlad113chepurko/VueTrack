<script setup lang="ts">
import "./_AddProjects.scss";
import { ref } from "vue";
import type { Project } from "@/interfaces/index";
import { useProjectStore } from "@/stores/useProjectStore";
import { useModalStore } from "@/stores/useModalStore";

const projectStore = useProjectStore();
const projects = projectStore.projects;
const modalStore = useModalStore();

const newProject = ref<Project>({
  ID: projects.length > 0 ? Math.max(...projects.map((p) => p.ID)) + 1 : 1,
  ProjectName: "",
  ProjectDescription: "",
  TaskCounter: 0,
  Status: "",
  CreateAt: new Date().toLocaleDateString(),
  Tasks: [],
});

const onSubmit = () => {
  projectStore.addProject(newProject.value);

  modalStore.createModal(
    `Project ${newProject.value.ProjectName} was created!`
  );

  newProject.value = {
    ID: projects.length > 0 ? Math.max(...projects.map((p) => p.ID)) + 1 : 1,
    ProjectName: "",
    ProjectDescription: "",
    TaskCounter: 0,
    Status: "",
    CreateAt: new Date().toLocaleDateString(),
    Tasks: [],
  };
};
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <h2>Add New Project</h2>
    <button @click="$emit('close')" type="button" class="form__close">
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
