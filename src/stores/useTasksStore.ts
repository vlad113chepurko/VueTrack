import { defineStore } from "pinia";
import type { Task } from "@/types/task.type";
import { ref, watch, computed } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const selectedAuthor = ref<string>("All");
  const selectedStatus = ref<string>("All");
  const currentProjectId = ref<number | null>(null);
  const selectedDeadline = ref<string>("");
  const sortBy = ref<string>("All");
  const sortOrder = ref<"asc" | "desc">("asc");

  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  }

  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    },
    { deep: true }
  );

  function addTask(task: Task) {
    tasks.value.push(task);
  }
  // Filters
  const filteredTasks = computed(() => {
    let filtered = tasks.value;

    if (currentProjectId.value !== null) {
      filtered = filtered.filter((t) => t.ProjectID === currentProjectId.value);
    }

    if (selectedAuthor.value !== "All") {
      filtered = filtered.filter((t) => t.TaskAuthor === selectedAuthor.value);
    }

    if (selectedStatus.value !== "All") {
      filtered = filtered.filter((t) => t.TaskStatus === selectedStatus.value);
    }

    if (selectedDeadline.value !== "") {
      filtered = filtered.filter(
        (t) =>
          new Date(t.TaskDeadline).getTime() <=
          new Date(selectedDeadline.value).getTime()
      );
    }

    filtered = filtered.slice().sort((a, b) => {
      if (sortBy.value === "deadline") {
        const dateA = new Date(a.TaskDeadline).getTime();
        const dateB = new Date(b.TaskDeadline).getTime();
        return sortOrder.value === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy.value === "status") {
        const statusA = a.TaskStatus.toLowerCase();
        const statusB = b.TaskStatus.toLowerCase();
        if (statusA < statusB) return sortOrder.value === "asc" ? -1 : 1;
        if (statusA > statusB) return sortOrder.value === "asc" ? 1 : -1;
        return 0;
      }
      return 0;
    });

    return filtered;
  });

  return {
    tasks,
    addTask,
    currentProjectId,
    filteredTasks,
    selectedAuthor,
    selectedStatus,
    selectedDeadline,
    sortOrder,
  };
});
