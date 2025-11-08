<script setup lang="ts">
import "../addProject/_AddProjects.scss";
import { ref } from "vue";
import { useRoute } from "vue-router";
import type { Task } from "@/interfaces/index";
import { useProjectStore } from "@/stores/useProjectStore";
import { useTasksStore } from "@/stores/useTasksStore";
import { TaskService } from "@/services/tasks.service";

const route = useRoute();
const projectIdFromRoute = Number(route.params.id);
const projects = useProjectStore().projects;
const tasks = useTasksStore().tasks;

const newTask = ref<Task>({
  ID: tasks.length > 0 ? Math.max(...tasks.map((t) => t.ID)) + 1 : 1,
  TaskName: "",
  TaskAuthor: "",
  TaskStatus: "todo",
  TaskDeadline: new Date().toString().split("T")[0],
  ProjectID: projectIdFromRoute,
});
</script>

<template>
  <form
    class="form"
    @submit.prevent="TaskService.addTaskToProject(newTask, projects)"
  >
    <h2>Add New Task</h2>
    <button @click="$emit('close')" type="button" class="form__close">
      <span>X</span>
    </button>
    <label for="taskName">Task Name</label>
    <input
      v-model="newTask.TaskName"
      type="text"
      name="taskName"
      id="taskName"
      placeholder="Enter task name"
      required
    />
    <label for="taskAuthor">Author</label>
    <select name="taskAuthor" id="taskAuthor" v-model="newTask.TaskAuthor">
      <option value="Alice">Alice</option>
      <option value="Bob">Bob</option>
      <option value="Charlie">Charlie</option>
    </select>
    <label for="taskName">Task Status</label>
    <select name="status" id="taskStatus" v-model="newTask.TaskStatus">
      <option value="Todo">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
    <label for="taskDeadline">Deadline</label>
    <input
      type="date"
      name="taskDeadline"
      id="taskDeadline"
      v-model="newTask.TaskDeadline"
      required
    />
    <button class="form__add" type="submit">Add Task</button>
  </form>
</template>
