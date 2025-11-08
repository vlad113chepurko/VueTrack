import { defineStore } from "pinia";
import type { Project } from "@/interfaces/index";
import { ref, watch, computed } from "vue";

export const useProjectStore = defineStore("project", () => {
  const projects = ref<Project[]>(
    localStorage.getItem("projects")
      ? JSON.parse(localStorage.getItem("projects")!)
      : []
  );

  watch(projects, (newVal) => {
    localStorage.setItem("projects", JSON.stringify(newVal));
  });

  const selectedStatus = ref("All");
  const projectName = ref("");

  const filteredProjects = computed(() => {
    let filtered = projects.value;
    if (selectedStatus.value !== "All") {
      filtered = filtered.filter(
        (p) => p.Status?.toLowerCase() === selectedStatus.value.toLowerCase()
      );
    }
    if (projectName.value) {
      filtered = filtered.filter((p) =>
        p.ProjectName?.toLowerCase().includes(projectName.value.toLowerCase())
      );
    }
    return filtered;
  });

  // Sorting

  // Sorting by Name
  function sortingByName(sortByName: string) {
    if (sortByName === "nameAsc") {
      projects.value.sort(
        (a, b) => a.ProjectName?.localeCompare(b.ProjectName || "") || 0
      );
    } else if (sortByName === "nameDesc") {
      projects.value.sort(
        (a, b) => b.ProjectName?.localeCompare(a.ProjectName || "") || 0
      );
    }
    localStorage.setItem("projects", JSON.stringify(projects.value));
  }

  // Sorting by Count
  function sortingByCount(sortByCount: string) {
    if (sortByCount === "countAsc") {
      projects.value.sort(
        (a, b) => (a.TaskCounter || 0) - (b.TaskCounter || 0)
      );
    } else if (sortByCount === "countDesc") {
      projects.value.sort(
        (a, b) => (b.TaskCounter || 0) - (a.TaskCounter || 0)
      );
    }
    localStorage.setItem("projects", JSON.stringify(projects.value));
  }

  // Sorting by ID
  function sortingById(sortById: string) {
    if (sortById === "idAsc") {
      projects.value.sort((a, b) => a.ID - b.ID);
    } else if (sortById === "idDesc") {
      projects.value.sort((a, b) => b.ID - a.ID);
    }
    localStorage.setItem("projects", JSON.stringify(projects.value));
  }

  // Sorting by Status
  function sortingByStatus(sortByStatus: string) {
    if (sortByStatus === "statusAsc") {
      projects.value.sort(
        (a, b) => a.Status?.localeCompare(b.Status || "") || 0
      );
    } else if (sortByStatus === "statusDesc") {
      projects.value.sort(
        (a, b) => b.Status?.localeCompare(a.Status || "") || 0
      );
    }
    localStorage.setItem("projects", JSON.stringify(projects.value));
  }

  function addProject(newProject: Project) {
    projects.value.push(newProject);
    localStorage.setItem("projects", JSON.stringify(projects.value));
  }

  function getProjectById(id: number): Project | undefined {
    return projects.value.find((project) => project.ID === id);
  }

  function setStatusFilter(status: string) {
    selectedStatus.value = status;
  }

  return {
    projects,
    filteredProjects,
    selectedStatus,
    projectName,
    addProject,
    getProjectById,
    setStatusFilter,
    sortingById,
    sortingByStatus,
    sortingByName,
    sortingByCount,
  };
});
