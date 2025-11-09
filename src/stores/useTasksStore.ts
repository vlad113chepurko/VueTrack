import { defineStore } from "pinia";
import type { Task } from "@/types/task.type";
import { ref, watch, computed } from "vue";
import { useProjectStore } from "@/stores/useProjectStore";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const taskToEdit = ref<Task | null>(null);
  const selectedAuthor = ref<string>("All");
  const selectedStatus = ref<string>("All");
  const currentProjectId = ref<number | null>(null);
  const selectedDeadline = ref<string>("");
  const sortBy = ref<string>("All");
  const sortOrder = ref<"asc" | "desc">("asc");
  const projectStore = useProjectStore();

  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  }

  watch(
    tasks,
    (newTasks) => {
      const counts: Record<number, number> = {};
      newTasks.forEach((t) => {
        counts[t.ProjectID] = (counts[t.ProjectID] || 0) + 1;
      });

      projectStore.projects.forEach((p: any) => {
        const newCount = counts[p.ID] || 0;
        if (p.TaskCounter !== newCount) {
          p.TaskCounter = newCount;
        }
      });

      localStorage.setItem("projects", JSON.stringify(projectStore.projects));
    },
    { deep: true, immediate: true }
  );

  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    },
    { deep: true }
  );

  function setTaskToEdit(task: Task | null) {
    taskToEdit.value = task;
  }

  function addTask(task: Task) {
    tasks.value.push(task);
  }

  function deleteTask(taskId: number) {
    tasks.value = tasks.value.filter((task) => task.ID !== taskId);
  }

  function updateTask(updatedTask: Task) {
    const index = tasks.value.findIndex((task) => task.ID === updatedTask.ID);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
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
    taskToEdit,
    setTaskToEdit,
    tasks,
    addTask,
    deleteTask,
    updateTask,
    currentProjectId,
    filteredTasks,
    selectedAuthor,
    selectedStatus,
    selectedDeadline,
    sortOrder,
  };
});
