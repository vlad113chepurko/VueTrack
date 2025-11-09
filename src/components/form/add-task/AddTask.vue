<script setup lang="ts">
import "../add-project/_AddProjects.scss";
import { ref } from "vue";
import { useRoute } from "vue-router";
import type { Task } from "@/types/task.type";
import { useTasksStore } from "@/stores/useTasksStore";
import { TaskService } from "@/services/tasks.service";
import { Field } from "vee-validate";
import { useFormStore } from "@/stores/useFormStore";

const route = useRoute();
const projectIdFromRoute = Number(route.params.id);
const tasks = useTasksStore().tasks;
const formStore = useFormStore();

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
  <form class="form" @submit.prevent="TaskService.addTaskToProject(newTask)">
    <h2>Add New Task</h2>
    <button @click="formStore.closeForm()" type="button" class="form__close">
      <span>X</span>
    </button>
    <label for="taskName">Task Name</label>
    <Field
      as="input"
      v-model="newTask.TaskName"
      name="taskName"
      id="taskName"
      placeholder="Enter task name"
      rules="required"
      required
    />
    <label for="taskAuthor">Author</label>
    <Field
      as="select"
      name="taskAuthor"
      id="taskAuthor"
      v-model="newTask.TaskAuthor"
      rules="required"
    >
      <option value="Alice">Alice</option>
      <option value="Bob">Bob</option>
      <option value="Charlie">Charlie</option>
    </Field>
    <label for="taskName">Task Status</label>
    <Field
      as="select"
      name="status"
      id="taskStatus"
      v-model="newTask.TaskStatus"
      rules="required"
    >
      <option value="Todo">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </Field>
    <label for="taskDeadline">Deadline</label>
    <Field
      as="input"
      type="date"
      name="taskDeadline"
      id="taskDeadline"
      v-model="newTask.TaskDeadline"
      required
    />
    <button class="form__add" type="submit">Add Task</button>
  </form>
</template>
